const express = require("express")
const {getAllCategories, addNewCategories, updateCategories, deleteCategories, getCategoriesId} = require('../controller/categoriesController')
const router = express.Router()

router.get('/', getAllCategories)
router.get('/:categories_id', getCategoriesId )
router.post('/', addNewCategories)
router.patch('/:categories_id', updateCategories)
router.delete('/:categories_id', deleteCategories)


module.exports = router