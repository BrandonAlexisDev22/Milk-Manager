const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/ReporteController');

router.post('/', reporteController.createReporte);
router.get('/', reporteController.getReportes);
router.get('/:id', reporteController.getReporteById);
router.put('/:id', reporteController.updateReporte);
router.delete('/:id', reporteController.deleteReporte);

module.exports = router;
