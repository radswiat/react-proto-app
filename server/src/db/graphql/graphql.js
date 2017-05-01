import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { graphqlConfig } from 'config';
import mongoose from 'mongoose';

import Category from 'db/graphql-resolvers/category';

const registeredResolvers = [
  Category
];

const schema = `

  ${registeredResolvers.map(resolver => resolver.SchemaInputType)}

  ${registeredResolvers.map(resolver => resolver.SchemaType)}
  
  ${registeredResolvers.map(resolver => resolver.SchemaMutation)}

  type Query {
    title: String,
    ${registeredResolvers.map(resolver => resolver.SchemaQuery)}
  }
`;

let root = {};

// apply all registered resolvers to root
// ignore underscored methods
let excludedMethods = ['constructor'];
for (let Resolver of registeredResolvers) {
  let resolverMethods = Object.getOwnPropertyNames(Resolver.prototype);
  for (let method of resolverMethods) {
    console.log(method);
    if (excludedMethods.indexOf(method) < 0) {
      root[method] = (params) => {
        let resolverInstance = new Resolver();
        return resolverInstance[method](params);
      };
    }
  }
}

export default class GraphQLService {
  connect(expressApp) {
    expressApp.use(graphqlConfig.path, graphqlHTTP({
      schema: buildSchema(schema),
      rootValue: root,
      petty: true,
      graphiql: true
    }));

    mongoose.connect('mongodb://localhost/nightwatch');
  }
}
