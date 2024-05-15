require('dotenv').config();
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const path = require('path');
const {dbConnect} = require ('./db/db');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const users = require('./model/login.model');

dbConnect.authenticate()
.then(() => console.log('Db authenticated'))
.catch(err => console.log(err));

dbConnect.sync()
.then(() => console.log('Db synced'))
.catch(err => console.log(err));

const app = express();
const server = http.createServer(app);
const secret = crypto.randomBytes(32).toString('hex');

app.use(session({
    secret: `${secret}`,
    resave: false,
    saveUninitialized: false,
  }));

app.use(bodyParser.json());
app.use(cookieParser());

const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next(); 
    } else {
        res.redirect('/login'); 
    }
};

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        } else {
            res.redirect('/login');
        }
    });
});

app.use('/home/css', express.static(path.join(__dirname, 'css'), {extensions: ['css']}));
app.use('/home/js', express.static(path.join(__dirname, 'controlador'), {extensions: ['js']}));
app.use('/home/img', express.static(path.join(__dirname, 'img'), {extensions: ['.png']}));
app.use('/home/html', express.static(path.join(__dirname, 'vista'), {extensions: ['.html']})); 

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'vista', 'login.vista.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'vista', 'register.vista.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'vista', 'home.vista.html'));
});

server.listen(9000, () => {
    console.log("Servidor iniciado en el port: 9000");
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const user = await users.findOne({ where: { email } });

        if (user) {
            if (password === user.password) {
                req.session.user = user;
                res.status(200).send('Inicio de sesión exitoso');
            } else {
                res.status(401).send('Correo electrónico o contraseña incorrectos');
            }
        } else {
            res.status(401).send('Correo electrónico o contraseña incorrectos');
        }

    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post('/register', async (req, res) => {
    const { nombres, apellidos, nacimiento, email, password, grado, genero } = req.body;
    console.log(req.body)

    try {
        await usuarios.create({
            tipo_usuario: usertype,
            email: email,
            password: password
        });

        if (usertype.toLowerCase() === 'paciente') {
            await pacientes.create({
                name: username,
                firstname: firstname,
                dni: dni,
                years: years,
            });
        }

        if (usertype.toLowerCase() === 'doctor') {
            await doctores.create({
                name: username,
                firstname: firstname,
                dni: dni,
                years: years,
            });
        }

        if (usertype.toLowerCase() === 'medico') {
            await medicos.create({
                name: username,
                firstname: firstname,
                dni: dni,
                years: years,
            });
        }

        res.status(200).send('Registro exitoso');

    } catch (error) {
        console.error('Error al intentar registrar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});