const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cors = require('cors');
const puerto = process.env.PORT || 3000;

//Rutas personalizadas
const rutasCategoriasAPI = require('./src/routes/categorias-routes-api');
const rutasUsuarioAPI = require('./src/routes/usuarios-routes-api');
const rutasAuthAPI = require('./src/routes/auth-routes-api');

const app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials',()=>{});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extenden : true}));
app.use(bodyParser.json())

//Definir rutas: login, categorias, index y Not Found
//GETS o POST

app.get('/',(req,res)=>{
    res.render('index');    
})

app.get('/login',(req,res)=>{
    res.render('signin-one');
})

//Me regresa en formato JSON los datos de categoria
app.use('/categorias/api',rutasCategoriasAPI);
app.use('/usuarios/api',rutasUsuarioAPI);
app.use('/auth/api',rutasAuthAPI);
//app.use('/productos/api',)

//Me regresa en formato HTML la vista
app.get('/categorias',(req,res)=>{
    res.render('advance-table');    
})

app.get('*',(req,res)=>{
    res.render('404');
})

//Definir puerto en que se escuchan solicitudes
app.listen(puerto,()=>{
    console.log('El servidor esta corriendo en el puerto: ' ,puerto);    
})