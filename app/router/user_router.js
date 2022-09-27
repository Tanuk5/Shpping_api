const express = require('express');
const Router = express.Router();
const _controller = require('../controller/user_controller')

Router.get('/', _controller.getUserItem); // admin level
Router.post('/signup', _controller.createNewUser);
Router.post('/login', _controller.userLogin);
Router.put('/', _controller.updateUser);
Router.delete('/', _controller.deleteUser);

module.exports = Router;