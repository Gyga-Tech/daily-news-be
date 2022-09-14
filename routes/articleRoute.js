const express = require("express")
// const { addNewArticle, updateArticle, deleteArticle } = require("../controller/articleController")
const {getAllArticle, getByID, addNewArticle, updateArticle, deleteArticle} = require('../controller/articleController')
const upload = require('../helper/multer')
const router = express.Router()
const verifyAuth = require("../helper/verifyAuth")

router.get('/', getAllArticle)
router.get('/:id', getByID)
router.post('/', upload , addNewArticle)
router.patch('/:article_id',verifyAuth, upload, updateArticle)
router.delete('/:article_id', verifyAuth, deleteArticle)




module.exports = router