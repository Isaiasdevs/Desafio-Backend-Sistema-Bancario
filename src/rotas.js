// arquivo de rotas do projeto

const express = require('express');
const rotas = express();
const {listarContas, cadastrarConta} = require('./controladores/controladores');
const {validarSenha, validarEmailCpf} = require('./intermediarios/intermediarios');



rotas.get('/listarContas', validarSenha , listarContas);
rotas.post('/cadastrarConta',validarEmailCpf, cadastrarConta);

module.exports = rotas;