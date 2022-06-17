const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('../myapp/config');

const userController = require('./src/controllers/userController');
const roleController = require('./src/controllers/roleController');
const orderController = require('./src/controllers/orderController');
const materialController = require('./src/controllers/materialController');
const actionController = require('./src/controllers/actionController');

const { initializeData } = require('./src/seed/user-seeder');

const router = require('./src/routes/routes');

// INITIALIZE APP
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());

// parse application/json
app.use(bodyParser.json())

// UUID
// app.get('/date', orderController.createUUID);

// Order
// app.post('/order/add', orderController.addOrder);
// app.get('/order/:id', orderController.getOrder);
// app.put('/order/:id', orderController.updateOrder);
// app.delete('/order/:id', orderController.deleteOrder);
// app.get('/order', orderController.getOrders);

// Role
// app.post('/role/add', roleController.addRole);
// app.delete('/role/:id', roleController.getRoles);
// app.get('/role', roleController.deleteRole);

// User
// app.post('/user/add', userController.addUser);
// app.get('/user/:id', userController.getUser);
// app.put('/user/:id', userController.updateUser);
// app.delete('/user/:id', userController.deleteUser);
// app.get('/user', userController.getUsers);

// Material
// app.post('/material/add', materialController.addMaterial);
// app.get('/material', materialController.getMaterials);

// Action
// app.post('/action/add', actionController.addAction);
// app.get('/action', actionController.getActions);

// LACZENIE Z mongoDB
mongoose.connect(config.URI_MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log('Polaczono z baza mongoDB'));

mongoose.connection.on('connected', () => {
  initializeData();
  console.log('Initialize user');
});

mongoose.connection.on('error', (err) => {
  console.log('Error: Could not connect to MongoDB.', err);
});

// ROUTES APP
app.use('/', router);

// START APP
app.listen(config.PORT_LISTEN, () => console.log(`Listening... port ${config.PORT_LISTEN}`));