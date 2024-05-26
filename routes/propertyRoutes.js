const express = require('express');
const { createProperty, getProperties, updateProperty,deleteProperty , getPropertyByTitle,getPropertiesBySeller}  = require('../controllers/PropertyController');
//const {authenticateToken} = require('../middleware/auth')
const router = express.Router();

router.post('/', createProperty);
router.get('/', getProperties);
router.get('/:seller', getPropertiesBySeller);
router.put('/:title', updateProperty);

router.delete('/:title', deleteProperty);


router.get('/seller/:title', getPropertyByTitle);

module.exports = router;