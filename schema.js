
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

// Hardcoded data

/*
const Customers = [
    {id: '1', name: 'joe Doe', email: 'jon@gmail.com', age: 35},
    {id: '2', name: 'steve Smith', email: 'steve@gmail.com', age: 30},
    {id: '3', name: 'Sara Williams', email: 'sara@gmail.com', age: 45},
    {id: '4', name: 'Miki Berkovits', email: 'miki@gmail.com', age: 25}
];
*/
// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () =>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},

    })
});

// Option Type
const OptionType = new GraphQLObjectType({
    name: 'Option',
    fields: () =>({
        id: {type: GraphQLInt},
        contract: {type: GraphQLString},
        period: {type: GraphQLString},
        month: {type: GraphQLInt},
        week: {type: GraphQLInt}
    })
});
// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () =>({
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
        },
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
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});