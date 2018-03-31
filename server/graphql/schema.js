
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



// Option Type
const OptionType = new GraphQLObjectType({
    name: 'Option',
    fields: () =>({
        id: {type: GraphQLInt},
        contract: {type: GraphQLString},
        period: {type: GraphQLString},
        month: {type: GraphQLInt},
        week: {type: GraphQLInt},
        expiration: {type: DateTimeScalar}
    })
});
// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () =>({
        ...CustomerQueries,
        Options:{
            type: new GraphQLList(OptionType),
            resolve(){
                return axios.get('http://localhost:4051/Options' )
                .then(res => res.data);
            }
        }
    })    
});

// Mutation

const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields: {
        ...CustomerMutation
       
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation 
    
});