
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,    
} = require('graphql');

import CustomerType from './customerType';

const CustomerQueries = {
    Customer:{
        type: CustomerType,
        args: {
            id: {type: GraphQLString}
        },
        resolve(parentValue, args){
           return axios.get('http://localhost:4051/Customers/' + args.id)
            .then(res => res.data);
              //  return Customers.find(x=> x.id == args.id);
        }
    },        
    Customers:{
        type: new GraphQLList(CustomerType),
        resolve(){
            return axios.get('http://localhost:4051/Customers' )
            .then(res => res.data);
        }
    }
}
export default CustomerQueries