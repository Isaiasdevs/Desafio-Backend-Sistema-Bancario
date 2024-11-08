// arquivo de rotas do projeto

const express = require('express');
const rotas = express();
const {listarContas} = require('./controladores/controladores');
const {validarSenha} = require('./intermediarios/intermediarios');



rotas.get('/listarContas', validarSenha , listarContas);

module.exports = rotas;