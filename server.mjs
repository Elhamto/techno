import express from 'express';
import expressPlayground from "graphql-playground-middleware-express";
const graphqlPlayground = expressPlayground.default;
import { ApolloServer } from 'apollo-server-express';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import 'dotenv/config'
import mongoose from 'mongoose'
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';
// import User from './User.mjs';
import userService from './services/user-service.mjs';
import typeDefs from './typeDefs.mjs';
import resolvers from './resolvers.mjs';

import route from "./routes/index.mjs";

mongoose.connect(process.env.MONGODB_URI);

passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    const users = userService.getUsers();
    const matchingUser = users.find(user => email === user.email && password === user.password);
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  const users = userService.getUsers();
  const matchingUser = users.find(user => user.id === id);
  done(null, matchingUser);
});

const app = express();

app.use(session({
  genid: () => uuidv4(),
  secret: process.env.SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); ///////////////////////ME
route(app); ///////////////////////ME

app.get("/", (req, res) => { ///////////////////////ME
  return res.send(`welcome to my app,
        Routes: 
            user crud: localhost:${process.env.PORT}/api/user 
            AND
            user list: localhost:${process.env.PORT}/api/user/list`)
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res, userService }), //User
  // context: ({ req }) => ({
  //   getUser: () => req.user,
  //   logout: () => req.logout(),
  // }),
});
await server.start();
server.applyMiddleware({ app });

app.get("/playground", graphqlPlayground({ endpoint: "/graphql" }));

app.listen({ port: process.env.PORT || 3000 }, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/playground `);
});
// await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
// console.log(`🚀 Server ready at http://localhost:4000/playground                                                                                                                         `);