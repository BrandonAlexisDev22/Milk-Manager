const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/AlertaController');

router.post('/', alertaController.createAlerta);
router.get('/', alertaController.getAlertas);
router.get('/:id', alertaController.getAlertaById);
router.put('/:id', alertaController.updateAlerta);
router.delete('/:id', alertaController.deleteAlerta);

module.exports = router;
