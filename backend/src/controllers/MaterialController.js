const Material = require('../models/Material');

// DODANIE MATERIALU
exports.addMaterial = (req, res) => {
    const { nazwa, stan } = req.body;
    const material = new Material({ nazwa, stan });
    material.save();
    return res.status(200).json(material);
};

// POBRANIE MATERIALOW
exports.getMaterials = async(req, res) => {
    const materials = await Material.find({});
    console.log(materials);
    return res.status(200).json(materials);
}