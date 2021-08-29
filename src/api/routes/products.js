const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');


//import multer -> it is body-parser type and help to parsing file or image
const multer = require("multer");
//create file storage
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,Date.now() + '--' + file.originalname);
    }
});

const upload = multer({storage: fileStorageEngine}); 



//imports controller
const ProductsController = require('../controller/product');



//Handle incoming req of products
router.get('/', ProductsController.products_get_all);

router.post('/', checkAdmin, upload.single('productImage'), ProductsController.create_product);

router.get('/:productId', ProductsController.products_get_byid);

router.patch('/:productId', checkAdmin, ProductsController.update_product);

router.delete('/:productId', checkAdmin,ProductsController.delete_product);
 

module.exports = router;