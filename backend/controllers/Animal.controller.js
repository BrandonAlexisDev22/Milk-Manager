const { Animal } = require('../models');

exports.createAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    await animal.save();
    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAnimales = async (req, res) => {
  try {
    const animales = await Animal.find().populate('finca');
    res.json(animales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('finca');
    if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });
    res.json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Animal no encontrado' });
    res.json({ message: 'Animal eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
