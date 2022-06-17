const Role = require('../models/Role');

// DODANIE ROLI
exports.addRole = (req, res) => {
    const title = req.body;
    const role = new Role(title);
    role.save();
    return res.status(200).json(role);
};

// POBRANIE ROLI
exports.getRoles = async(req, res) => {
    const roles = await Role.find({});
    return res.status(200).json(roles);
};

// USUNIECIE ROLI
exports.deleteRole = async(req, res) => {
    const role = await Role.findById(req.params.id);
    if(role == null) return res.status(200).json('Nie znaleziono');
    await Role.findByIdAndRemove(req.params.id);
    return res.status(404).json('Usunięto');
};