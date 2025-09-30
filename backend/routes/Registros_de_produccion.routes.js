const express = require('express');
const router = express.Router();
const produccionController = require('../controllers/ProduccionController');

router.post('/', produccionController.createProduccion);
router.get('/', produccionController.getProducciones);
router.get('/:id', produccionController.getProduccionById);
router.put('/:id', produccionController.updateProduccion);
router.delete('/:id', produccionController.deleteProduccion);

module.exports = router;
