const express = require("express")
const {getAllCategories, addNewCategories, updateCategories, deleteCategories} = require('../controller/categoriesController')
const upload = require("../helper/multer")
const router = express.Router()

router.get('/', getAllCategories)
router.post('/',upload, addNewCategories)
router.patch('/:categories_id', upload, updateCategories)
router.delete('/:categories_id', deleteCategories)


module.exports = router