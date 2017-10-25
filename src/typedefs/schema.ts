import gql from 'graphql-tag';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

export const typeDefs = gql`
  directive @entity on OBJECT
  directive @resolvers on OBJECT
  directive @query(collection: String!, query: String = "{}", sort: String = "{}", limit: Int) on FIELD
  directive @map(toField: String!) on FIELD
  directive @util(fromContext: String, momentFormat: String, objectField: String) on FIELD
  directive @link(collection: String!, objectField: String!, queryField: String!) on FIELD

  type User @entity {
    id: String! @map(toField: "_id")
    firstName: String! @util(fromContext: "getFirstName", objectField: "name")
    lastName: String! @util(fromContext: "getLastName", objectField: "name")
    fullName: String! @map(toField: "name")
    posts: [Post] @link(collection: "posts", objectField: "_id", queryField: "authorId")
  }

  type Post @entity {
    id: String! @map(toField: "_id")
    title: String!
    author: User! @link(collection: "users", objectField: "authorId", queryField: "_id")
    creationTime: String! @util(momentFormat: "DD/MM/YYYY", objectField: "createdAt")
  }

  type Query @resolvers {
    posts: [Post] @query(collection: "posts", sort: "{ createdAt: 1 }")
    users: [User] @query(collection: "users")
  }

  schema {
    query: Query
  }
`;

export default makeExecutableSchema({
  allowUndefinedInResolve: true,
  typeDefs,
}) as GraphQLSchema;
