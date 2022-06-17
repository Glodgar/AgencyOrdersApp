const Action = require('../models/Action');

// DODANIE AKCJI
exports.addAction = (req, res) => {
    const { nazwa } = req.body;
    const action = new Action({ nazwa });
    action.save();
    return res.status(200).json(action);  
};

// POBRANIE AKCJI
exports.getActions = async(req, res) => {
    const actions = await Action.find({});
    console.log(actions);
    return res.status(200).json(actions);
}