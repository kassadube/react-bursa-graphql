import axios from 'axios';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,    
} from 'graphql';

import OptionType from './optionType';
import DateTimeScalar from '../scalars/dateTimeScalar';

const OptionMutation = {
    addOption:{
        type: OptionType,
        args: {
            contract:{ type: new GraphQLNonNull(GraphQLInt)},
            type:{ type: new GraphQLNonNull(GraphQLString)},
            period:{ type: new GraphQLNonNull(GraphQLString)},
            id:{ type: GraphQLString},
            month:{ type: GraphQLInt},
            week:{ type: GraphQLInt},
            expiration: {type: DateTimeScalar}
        },
        resolve(parentValue, args){
            return axios.post('http://localhost:4051/Options', {
                id:args.id,
                contract: args.contract,
                type: args.type,
                period: args.period,
                month: args.month,
                week: args.week,
                expiration: args.expiration,
            })
            .then(res => res.data);
        }
    },
}

export default OptionMutation;