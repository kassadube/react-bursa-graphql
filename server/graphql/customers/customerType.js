const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,    
} = require('graphql');

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () =>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});
export default CustomerType;