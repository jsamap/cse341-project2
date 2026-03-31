const validator = require('../helpers/validate');

const saveCategory = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    description: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveProduct = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    description: 'required|string',
    category: 'required|string|size:24|regex:/^[0-9a-fA-F]{24}$/',
    price: 'required|numeric|min:0',
    currency: 'required|string',
    stock: 'required|integer|min:0',
    rating: 'numeric|min:0|max:5'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCategory,
  saveProduct
};
