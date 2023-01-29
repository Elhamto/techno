import userService from '../services/user-service.mjs';
import { v4 as uuidv4 } from 'uuid';
const resolvers = {
  Query: {
    // currentUser: (parent, args, context) => context.userService.getUsers(context.sessionId),
    currentUser: async (parent, args, context) => {
      const contextSrt = Object.values(context.req.sessionStore.sessions)[0]
      if (!contextSrt) return null
      const index = contextSrt.indexOf('{"user"')
      const passport =  JSON.parse(contextSrt.slice(index,-1))
      const id = Object.values(passport)[0]

      const existingUsers = await context.userService.getUsers();
      for (const iterator of existingUsers) {
        if (iterator._id.toString() == id)
          return iterator
      }
    },
  },
  Mutation: {
    login: async (parent, { email , password }, context) => {
      const { user } = await context.authenticate('graphql-local', { email, password });
      await context.login(user);
      return { user }
    },

    signup: async (parent, { username, firstName, lastName, email, password }, context) => {
      const existingUsers = await context.userService.getUsers();
      const userExists = !!existingUsers.find( user => user.email === email || user.username === username ); 
      if (userExists) {
        throw new Error(`'User already exists'`);
      }
      const newUser = {
        id: uuidv4(),
        username,
        firstName,
        lastName,
        email,
        password,
      };
      context.userService.addUser(newUser);
      await context.login(newUser);
      return { user: newUser };
    },

    logout: (parent, args, context) => context.logout(),

    edit: (parent, { username, firstName, lastName, email }, context) => JSON.stringify(userService.updateUser(username, firstName, lastName, email)),
    remove: (parent, { username }, context) => context.userService.removeUser(username),
  },
};
export default resolvers;
