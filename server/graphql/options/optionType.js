import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,    
} from'graphql';

import DateTimeScalar from '../scalars/dateTimeScalar';

const OptionType = new GraphQLObjectType({
    name: 'Option',
    fields: () =>({
        id: {type: GraphQLString},
        contract: {type: GraphQLInt},
        type: {type: GraphQLString},
        period: {type: GraphQLString},
        month: {type: GraphQLInt},
        week: {type: GraphQLInt},
        expiration: {type: DateTimeScalar}
    })
});

export default OptionType;