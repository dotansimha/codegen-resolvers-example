# GraphQL Codegen example for generating MongoDB resolvers from GraphQL scheme

## Overview

This example uses [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) custom templates feature, to generate GraphQL resolvers based on the GraphQL schema, using MongoDB. 

## How to run?

1. Start by cloning this project, then run `yarn` to install the project's dependencies.
2. Generate the resolvers code according to your GraphQL Schema by running `yarn generate`
3. Execute the server by running `yarn start`
4. Open GraphiQL (default to: `http://localhost:3000/graphiql`) to test the GraphQL endpoint.

## How it works?

The schema defines a custom [GraphQL Directives](https://medium.com/the-graphqlhub/graphql-tour-directives-558dee4fa903) to declare links, mapping and DB object structure between the GraphQL schema entites, then, using a custom GraphQL Code Generator template, we generate a custom TypeScript file with a resolver, that access the DB and fetches the data.

## Available Directives

These directives are available in this example:

* `@resolvers` - decalres that this GraphQL `type` is a root type, and it's fields and plain queries (put it over `Query` type)
* `@query` - goes with GraphQL field inside a type with `@resolvers`: declares the query that needed to be executed (including skip, limit and custom MongoDB cursor)

* `@entity` - declares that this GraphQL `type` comes the the DB, and the generator should generate Type resolvers for it
* `@map` - goes with GraphQL field inside a type with `@entity`: declare the mapping between the MongoDB field to GraphQL field, for example `id` -> `_id`
* `@util` - goes with GraphQL field inside a type with `@entity`: declares either a context function to execute or a simple MomentJS formating for Date
* `@link` - goes with GraphQL field inside a type with `@entity`: declares a MongoDB query that needed to execute in order to fetch the object, use it for table links

> See `src/typedefs/schema.ts` for the GraphQL definitions and GraphQL Schema.
