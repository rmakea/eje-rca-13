const express = require('express');
const categoriasControllerApi = require('../controllers/categorias-controller-api');
const categoriasAPI = require('../controllers/categorias-controller-api');
const router = express.Router();

//La Ruta (End Point) Get de todas las categorias
router.get('/',categoriasControllerApi.getTodasCategorias);

//La Ruta (End Point) GET solo una categoria
router.get('/:id',categoriasControllerApi.getCategoriaById);

//La Ruta (End Point) AGREGAR = POST de una categoria
router.post('/',categoriasControllerApi.agregarCategoria);

//La Ruta (End Point) UPDATE = PUT de una categoria
router.put('/:id',categoriasAPI.updateCategoria);

//La Ruta (End Point) DELETE de una categoria
router.delete('/:id',categoriasControllerApi.deleteCategoriaById);

//Para poder usar el router en otro archivo .js o modulos
module.exports=router;











//router.put