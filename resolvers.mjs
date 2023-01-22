
import { v4 as uuidv4 } from 'uuid';
const resolvers = {
  Query: {
    // currentUser: (parent, args, context) => context.userService.getUsers(context.sessionId),
    currentUser: async (parent, args, context) => console.log(context.session, "******************************"),
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      const { user } = await context.authenticate('graphql-local', { email, password });
      await context.login(user);
      return { user }
    },

    signup: async (parent, { username, firstName, lastName, email, password }, context) => {
      const existingUsers = context.userService.getUsers(1);
      const userExists = !!existingUsers.find(user => user.email === email);
      if (userExists) {
        throw new Error(`'User with email: ${email} already exists'`);
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
  },
};
export default resolvers;
