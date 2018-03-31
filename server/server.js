const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./graphql/schema.js');

const app = express();

app.use('/graphql', expressGraphQL({

    schema: schema,
    graphiql: true
}));

app.use('/', (req, res) => {
    res.json('Go to /graphiql to test your queries and mutations!');
  });
app.listen(4500, () => {
    console.log('Server is running on port 4500...');
});