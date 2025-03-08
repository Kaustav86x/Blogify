const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({ 
    storage: storage,
    fileFilter : (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png')
        {
            cb(null, true)
        }
        else {
            cb(new Error('Only jpg, jpeg or png files are allowed'), false)
        }
    } 
})

module.exports = upload