import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import { GraphQLSchema } from 'graphql';
import { typeDefs } from './typedefs/schema';

export const schema = makeExecutableSchema({
  allowUndefinedInResolve: true,
  typeDefs,
  resolvers,
}) as GraphQLSchema;
