const express = require("express")
const {getAllCategories, addNewCategories, updateCategories, deleteCategories, getCategoriesId} = require('../controller/categoriesController')
const upload = require("../helper/multer")
const router = express.Router()

router.get('/', getAllCategories)
router.get('/:categories_id', getCategoriesId )
router.post('/',upload, addNewCategories)
router.patch('/:categories_id', upload, updateCategories)
router.delete('/:categories_id', deleteCategories)

module.exports = router