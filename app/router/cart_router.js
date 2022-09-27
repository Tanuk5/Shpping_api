const express = require('express');
const Router = express.Router();
const _controller = require('../controller/cart_controller')

Router.get('/all', _controller.getCartItem); // admin level
Router.get('/:user_id', _controller.getUserCart);
Router.post('/', _controller.createNewCart);
Router.put('/', _controller.updateCart);
Router.put('/:user_id', _controller.addProductToCart);
Router.delete('/:card_id', _controller.deleteCart);

module.exports = Router;