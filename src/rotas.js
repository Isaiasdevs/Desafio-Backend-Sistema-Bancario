// arquivo de rotas do projeto

const express = require('express');
const rotas = express();
const {listarContas, cadastrarConta, atualizarConta, deletarConta, depositar} = require('./controladores/controladores');
const {validarSenha, validarEmailCpf} = require('./intermediarios/intermediarios');



rotas.get('/listarContas', validarSenha , listarContas);
rotas.post('/cadastrarConta',validarEmailCpf, cadastrarConta);
rotas.post('/transacoes/depositar', depositar);
rotas.put('/atualizarConta/:numeroConta',  atualizarConta);
rotas.delete('/deletarConta/:numeroConta',  deletarConta);


module.exports = rotas;