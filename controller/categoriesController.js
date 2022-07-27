const Categories = require("../model/Categories");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const results = await Categories.get(req, res);
      res.status(200).send(results);
    } catch (error) {
      res.send(error);
    }
  },
  getCategoriesId: async (req, res) => {
    try {
      const results = await Categories.getId(req, res);
      res.status(200).send(results);
    } catch (error) {
      res.send(error);
    }
  },
  addNewCategories: async (req, res) => {
    try {
      let reqModifier = {
        ...req,
    }
    if (req.file) {
      reqModifier = {
          ...req,
          body: { ...req.body, cover: req.file.filename }
      }
  }
      const results = await Categories.add(reqModifier, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  updateCategories: async (req, res) => {
    try {
      let reqModifier = {
         ...req,
     }
     if (req.file) {
         reqModifier = {
             ...req,
             body: { ...req.body, cover: req.file.filename }
         }
     }
     const results = await Categories.update(reqModifier, res);
     res.status(201).send(results);
   } catch (error) {
     res.status(400).send(error);
   }
 },
  deleteCategories: async (req, res) => {
    try {
      const results = await Categories.remove(req, res);
      res.status(201).send(results);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};