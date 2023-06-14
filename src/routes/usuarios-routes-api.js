const express = require('express');
const ususariosControllerApi = require('../controllers/usuarios-controller-api');
const router = express.Router();

router.post('/',ususariosControllerApi.agregarUsuario);

module.exports=router;