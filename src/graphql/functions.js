import {ProductDAO} from '../daos/index.js'

export const getAllProducts = async () => {
    return ProductDAO.getAll()
}

export const getProductByID = async () => {
    return ProductDAO.getByID()
}

export const deleteAllProducts = async () => {
    return ProductDAO.deleteAll()
}

export const deleteproductById = async () => {
    return ProductDAO.deleteById()
}

export const saveProduct = async () => {
    return ProductDAO.save()
}
