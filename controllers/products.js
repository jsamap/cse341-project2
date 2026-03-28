const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=["Products"]
    const result = await mongodb.getDatabase().db("project2").collection("products").find()
    result.toArray().then((products) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(products)
    })
}

const getSingle = async (req, res) => {
    //#swagger.tags=["Products"]
    const productId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db("project2").collection("products").find({ _id: productId})
    result.toArray().then((products) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(products[0])
    })
}

const createProduct = async (req, res) => {
    //#swagger.tags=["Products"]
    const product = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        currency: req.body.currency,
        stock: req.body.stock,
        rating: req.body.rating,
    }
    const response = await mongodb.getDatabase().db("project2").collection("products").insertOne(product)
    if (response.acknowledged)
        res.status(201).json({ id: response.insertedId })
    else
        res.status(500).json(response.error || "Some error ocurred while creating the product.")
}

const updateProduct = async (req, res) => {
    //#swagger.tags=["Products"]
    const productId = new ObjectId(req.params.id)
    const product = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        currency: req.body.currency,
        stock: req.body.stock,
        rating: req.body.rating,
    }
    const response = await mongodb.getDatabase().db("project2").collection("products").replaceOne({_id: productId}, product)
    if (response.modifiedCount > 0)
        res.status(204).send()
    else
        res.status(500).json(response.error || "Some error ocurred while updating the product.")
}

const deleteProduct = async (req, res) => {
    //#swagger.tags=["Products"]
    const productId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db("project2").collection("products").deleteOne({ _id: productId})
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(204).send(); // or res.status(200).json(result);
}

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
}