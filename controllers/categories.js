const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=["Categories"]
    const result = await mongodb.getDatabase().db("project2").collection("categories").find()
    result.toArray().then((categoriees) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(categoriees)
    })
}

const getSingle = async (req, res) => {
    //#swagger.tags=["Categories"]
    const categoryId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db("project2").collection("categories").find({ _id: categoryId})
    result.toArray().then((categories) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(categories[0])
    })
}

const createCategory = async (req, res) => {
    //#swagger.tags=["Categories"]
    const category = {
        name: req.body.name,
        description: req.body.description
    }
    const response = await mongodb.getDatabase().db("project2").collection("categories").insertOne(category)
    if (response.acknowledged)
        res.status(201).json({ id: response.insertedId })
    else
        res.status(500).json(response.error || "Some error ocurred while creating the category.")
}

const updateCategory = async (req, res) => {
    //#swagger.tags=["Categories"]
    const categoryId = new ObjectId(req.params.id)
    const category = {
        name: req.body.name,
        description: req.body.description
    }
    const response = await mongodb.getDatabase().db("project2").collection("categories").replaceOne({_id: categoryId}, category)
    if (response.modifiedCount > 0)
        res.status(204).send()
    else
        res.status(500).json(response.error || "Some error ocurred while updating the category.")
}

const deleteCategory = async (req, res) => {
    //#swagger.tags=["Categories"]
    const categoryId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db("project2").collection("categories").deleteOne({ _id: categoryId})
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(204).send();
}

module.exports = {
    getAll,
    getSingle,
    createCategory,
    updateCategory,
    deleteCategory
}