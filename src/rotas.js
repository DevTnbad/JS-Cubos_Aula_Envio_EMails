const { Router } = require('express');
const { loginTeste } = require('./controladores/login');
const { enviarEmail } = require('./controladores/email');
const rotas = Router();

rotas.post('/login', loginTeste);
rotas.post('/enviar', enviarEmail);

module.exports = rotas;