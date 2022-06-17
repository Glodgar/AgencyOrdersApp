const User = require('../models/User');

// DODANIE UZYTKOWNIKA
exports.addUser = (req) => {
    const { imie, nazwisko, email, nrTelefonu, rola, dataUtworzenia, dataModyfikacji, haslo } = req.body;
    const user = new User({ imie, nazwisko, email, nrTelefonu, rola, dataUtworzenia, dataModyfikacji, haslo });
    user.save();
    return user;
};

// POBRANIE UZYTKOWNIKA
exports.getUser = async(req, res) => {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
};

// AKTUALIZACJA UZYTKOWNIKA
exports.updateUser = async(req, res) => {
    const user = await User.findById(req.params.id);
    const { imie, nazwisko, email, nrTelefonu, rola, dataUtworzenia, dataModyfikacji } = req.body;
    user.imie = imie;
    user.nazwisko = nazwisko;
    user.email = email;
    user.nrTelefonu = nrTelefonu;
    user.rola = rola;
    user.dataUtworzenia = dataUtworzenia;
    user.dataModyfikacji = dataModyfikacji;
    user.save();
    return res.status(200).json(user);
};

// USUNIECIE UZYTKOWNIKA
exports.deleteUser = async(req, res) => {
    const loggedUser = await User.findOne({_id:req.user.id});
    console.log(loggedUser);
    const user = await User.findById(req.params.id);
    if(user == null) return res.status(200).json('Nie znaleziono');
    await User.findByIdAndRemove(req.params.id);
    return res.status(404).json('Usunięto');
};

// POBRANIE WSZYSTKICH UZYTKOWNIKOW
exports.getUsers = async(req, res) => {
    const users = await User.find({}, {}, (err, users) => {
        if(err || !users) {
            res.status(401).send({message: "Unauthorized"});
            next(err);
        } else {
            return res.status(200).json(users); 
        }
    });
};