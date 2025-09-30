const express = require('express');
const router = express.Router();
const configController = require('../controllers/ConfiguracionController');

router.post('/', configController.createConfig);
router.get('/', configController.getConfigs);
router.get('/:id', configController.getConfigById);
router.put('/:id', configController.updateConfig);
router.delete('/:id', configController.deleteConfig);

module.exports = router;
