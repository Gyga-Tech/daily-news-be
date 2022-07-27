const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }

}) 

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
  
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'), 'test') 
      
    }
    cb(null, true)
  }
 
  const limits = {
    fileSize: 1 * 8024 * 8024
  }
  
  const uploadArticle = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
  }).single('cover')


  
  const upload = (req, res, next) => {
    uploadArticle(req, res, (err) => {
      if (err) {
        return res.json({
         
          message: err.message
        })
      } else if (err) {
        return res.json({
          
          message: 'Failed to upload image!'
        })
      }
      next()
    })
  }

module.exports = upload