import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from './schema';
import { initDb } from './db';
import { initMockData } from './mocks';
import utils from './utils';

const init = async () => {
  const PORT = 3000;
  const app = express();
  app.use(cors());
  const db = await initDb('mongodb://localhost:27017/codegen');

  await initMockData(db);

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    context: {
      db,
      ...utils,
    },
  }));
  app.get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    query: `
query {
  posts {
    id
    title
    author {
      lastName
      firstName
      fullName
    }
    creationTime
  }
  
  users {
    id
    firstName
    lastName
    posts {
      id
      title
    }
  }
}
    `
  }));

  app.listen(PORT);
};

init()
  .then(() => {
    console.log('Server started...');
  })
  .catch(e => {
    console.log('Server error:', e);
  });