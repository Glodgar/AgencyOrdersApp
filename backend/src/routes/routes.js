const express = require('express');

// KONTROLERY
const authController = require('../auth/auth');
const accessTokenVerify = require('../middleware/isAuth');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');
const roleController = require('../controllers/roleController');
const materialController = require('../controllers/materialController');
const actionController = require('../controllers/actionController');

const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/refresh', authController.refreshTokenVerify);

// SECURE ROUTER
// USER
router.post('/user/add', accessTokenVerify, userController.addUser);
router.get('/user/:id', accessTokenVerify, userController.getUser);
router.put('/user/:id', accessTokenVerify, userController.updateUser);
router.delete('/user/:id', accessTokenVerify, userController.deleteUser);
router.get('/user', accessTokenVerify, userController.getUsers);

// ORDER
router.get('/date', accessTokenVerify, orderController.createUUID);
router.post('/order/add', accessTokenVerify, orderController.addOrder);
router.get('/order/:id', accessTokenVerify, orderController.getOrder);
router.put('/order/:id', accessTokenVerify, orderController.updateOrder);
router.delete('/order/:id', accessTokenVerify, orderController.deleteOrder);
router.get('/order', accessTokenVerify, orderController.getOrders);

// ROLE
router.post('/role/add', accessTokenVerify, roleController.addRole);
router.delete('/role/:id', accessTokenVerify, roleController.deleteRole);
router.get('/role', accessTokenVerify, roleController.getRoles);

// MATERIAL
router.post('/material/add', accessTokenVerify, materialController.addMaterial);
router.get('/material', accessTokenVerify, materialController.getMaterials);

// ACTION
router.post('/action/add', accessTokenVerify, actionController.addAction);
router.get('/action', accessTokenVerify, actionController.getActions);


// router.post('/register', middleware.accessTokenVerify, authController.createUser);

module.exports = router;