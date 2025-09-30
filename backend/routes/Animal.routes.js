const express = require('express');
const router = express.Router();
const animalController = require('../controllers/AnimalController');

router.post('/', animalController.createAnimal);
router.get('/', animalController.getAnimales);
router.get('/:id', animalController.getAnimalById);
router.put('/:id', animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimal);

module.exports = router;
