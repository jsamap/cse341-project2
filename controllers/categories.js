const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    mongodb
      .getDatabase()
      .db("project2")
      .collection("categories")
      .find()
      .toArray((err, contacts) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid id to find a category.");
    }

    const categoryId = new ObjectId(req.params.id);
    mongodb
      .getDatabase()
      .db("project2")
      .collection("categories")
      .find({ _id: categoryId })
      .toArray((err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result[0]);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCategory = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    const category = {
      name: req.body.name,
      description: req.body.description,
    };
    const response = await mongodb
      .getDatabase()
      .db("project2")
      .collection("categories")
      .insertOne(category);
    if (response.acknowledged)
      res.status(201).json({ id: response.insertedId });
    else
      res
        .status(500)
        .json(
          response.error || "Some error ocurred while creating the category.",
        );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid id to update a category.");
    }
    const categoryId = new ObjectId(req.params.id);
    const category = {
      name: req.body.name,
      description: req.body.description,
    };
    const response = await mongodb
      .getDatabase()
      .db("project2")
      .collection("categories")
      .replaceOne({ _id: categoryId }, category);
    if (response.modifiedCount > 0) res.status(204).send();
    else
      res
        .status(500)
        .json(
          response.error || "Some error ocurred while updating the category.",
        );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  //#swagger.tags=["Categories"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid id to delete a category.");
    }
    const categoryId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db("project2")
      .collection("categories")
      .deleteOne({ _id: categoryId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the catergory.",
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCategory,
  updateCategory,
  deleteCategory,
};
