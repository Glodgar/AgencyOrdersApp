const Order = require('../models/Order');
const UUID = require('uuid-mongodb');

// UTWORZENIE ID ORAZ DATY
exports.createUUID = (req, res) => {
    const data = new Date().toISOString().split('T')[0].replace('-', '/').replace('-', '/');
    const id = data + '/' + UUID.v4().toString('N').slice(0, 8);
    return res.status(200).json({id, data});
},

// DODANIE ZLECENIA
exports.addOrder = (req, res) => {
    const { nrZlecenia, zleceniodawca, nazwaZlecenia, dataZlecenia, status, email, nrTelefonu, dataRealizacji, materialy, wycena ,wiadomosc } = req.body;
    const order = new Order({ nrZlecenia, zleceniodawca, nazwaZlecenia, dataZlecenia, status, email, nrTelefonu, dataRealizacji, materialy, wycena, wiadomosc });
    order.save();
    return res.status(200).json(order);
};

// POBRANIE ZLECENIA
exports.getOrder = async(req, res) => {
    const order = await Order.findById(req.params.id);
    return res.status(200).json(order);
};

// MODYFIKACJA ZLECENIA
exports.updateOrder = async(req, res) => {
    const order = await Order.findById(req.params.id);
    const { nrZlecenia, zleceniodawca, nazwaZlecenia, dataZlecenia, status, email, nrTelefonu, dataRealizacji, materialy, wycena, wiadomosc } = req.body;
    order.nrZlecenia = nrZlecenia;
    order.zleceniodawca = zleceniodawca;
    order.nazwaZlecenia = nazwaZlecenia;
    order.dataZlecenia = dataZlecenia;
    order.status = status;
    order.email = email;
    order.nrTelefonu = nrTelefonu;
    order.dataRealizacji = dataRealizacji;
    order.materialy = materialy;
    order.wycena = wycena;
    order.wiadomosc = wiadomosc;
    order.save();
    return res.status(200).json(order);
};

// USUNIECIE ZLECENIA
exports.deleteOrder = async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order == null) return res.status(200).json('Nie znaleziono');
    await Order.findByIdAndRemove(req.params.id);
    return res.status(404).json('Usunięto');
};

// POBRANIE ZLECEN
exports.getOrders = async(req, res) => {
    try {
        const orders = await Order.find({});
        return res.status(200).json(orders);   
    } catch (error) {
        res.status(400).send('Error while serching');
    }
};