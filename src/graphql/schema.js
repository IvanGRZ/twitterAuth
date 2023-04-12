import {buildSchema} from "graphql";
import {ProductType} from "./types/product.type.js";
import {getAllProductsQuery} from './queries/getAllProducts.query.js';
import {getProductByIdQuery} from './queries/getProductByID.query.js';
import {deleteAllProductsMutation} from './mutations/deleteAllProducts.mutation.js'
import {deleteproductByIdMutation} from './mutations/deleteproductById.mutation.js'
import {saveProductMutation} from './mutations/saveProduct.mutation.js'

export const schema = buildSchema(`

    ${ProductType}
    
    type Query {
        ${getAllProductsQuery}
        ${getProductByIdQuery} 
    }
    
    type Mutation {
        ${deleteAllProductsMutation}
        ${deleteproductByIdMutation}
        ${saveProductMutation}
    }
`);