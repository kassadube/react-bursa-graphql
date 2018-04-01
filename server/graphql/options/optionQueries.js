
import axios from 'axios'
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,    
} from'graphql';


import OptionType from './optionType';

const OptionQueries = {
    Options:{
        type: new GraphQLList(OptionType),
        resolve(){
            return axios.get('http://localhost:4051/Options' )
            .then(res => res.data);
        }
    }
}

export default OptionQueries