
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,    
} = require('graphql');

import DateTimeScalar from './scalars/dateTimeScalar';
import CustomerQueries from './customers/customerQueries';
import CustomerMutation from './customers/customerMutation';

import OptionQueries from './options/optionQueries';
import OptionMutation from './options/optionMutation';
//import CustomerMutation from './customers/customerMutation';



// Option Type

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () =>({
        ...CustomerQueries,
        ...OptionQueries
    })    
});

// Mutation

const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields: {
        ...CustomerMutation,
        ...OptionMutation
       
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation 
    
});