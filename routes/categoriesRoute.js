const express = require("express")
const {getAllCategories, addNewCategories, updateCategories, deleteCategories} = require('../controller/categoriesController')
const router = express.Router()

router.get('/', getAllCategories)
router.post('/', addNewCategories)
router.patch('/:categories_id', updateCategories)
router.delete('/:categories_id', deleteCategories)


module.exports = router