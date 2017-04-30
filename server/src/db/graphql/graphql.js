import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { graphqlConfig } from 'config';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'Hello world';
  }
};

export default class GraphQLService {
  constructor() {

  }

  connect(expressApp) {
    expressApp.use('/graphql', graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true
    }));
  }
}
