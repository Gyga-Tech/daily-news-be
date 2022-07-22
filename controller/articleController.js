const Article = require ("../model/Articles");

module.exports = {
    getAllArticle: async (req, res) => {
      // console.log (req.query)
      try {
        const results = await Article.get(req, res);
        res.status(200).send(results);
      } catch (error) {
        res.send(error);
      }
    },
    addNewArticle: async (req, res) => {
      // console.log (req.file, 'filname dari upload') 
      try {
        const reqModifier = {
          ...req,
          body: { ...req.body, cover: req.file.filename },
        };
        const results = await Article.add(reqModifier, res);
        res.status(201).send(results);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    updateArticle: async (req, res) => {
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
       const results = await Article.update(reqModifier, res);
       res.status(201).send(results);
     } catch (error) {
       res.status(400).send(error);
     }
   },
    deleteArticle: async (req, res) => {
      try {
        const results = await Article.remove(req, res);
        res.status(201).send(results);
      } catch (error) {
        res.status(400).send(error);
      }
    },
  };