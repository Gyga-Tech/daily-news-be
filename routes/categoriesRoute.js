const express = require("express")
const {getAllCategories, addNewCategories, updateCategories, deleteCategories, getCategoriesId} = require('../controller/categoriesController')
const upload = require("../helper/multer")
const verifyAuth = require("../helper/verifyAuth")
const router = express.Router()

router.get('/', getAllCategories)
router.get('/:categories_id', getCategoriesId )
router.post('/', verifyAuth, upload, addNewCategories)
router.patch('/:categories_id', verifyAuth, upload, updateCategories)
router.delete('/:categories_id', verifyAuth, deleteCategories)

module.exports = router