
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

const CustomerMutation = {

    addCustomer:{
        type: CustomerType,
        args: {
            name:{ type: new GraphQLNonNull(GraphQLString)},
            email:{ type: new GraphQLNonNull(GraphQLString)},
            age:{ type: new GraphQLNonNull(GraphQLInt)},
        },
        resolve(parentValue, args){
            return axios.post('http://localhost:4051/Customers', {
                name: args.name,
                email: args.email,
                age: args.age
            })
            .then(res => res.data);
        }
    },
    deleteCustomer: {
        type: CustomerType,
        args: {
            id:{ type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(parentValue, args){
            return axios.delete('http://localhost:4051/Customers/' + args.id)
            .then(res => res.data);
        }
    },
    editCustomer: {
        type: CustomerType,
        args: {
            id:{ type: new GraphQLNonNull(GraphQLString)},
            name:{ type: GraphQLString},
            email:{ type: GraphQLString},
            age:{ type: GraphQLInt},
        },
        resolve(parentValue, args){
            return axios.patch('http://localhost:4051/Customers/' + args.id, args)
            .then(res => res.data);
        }
    }
}

export default CustomerMutation;