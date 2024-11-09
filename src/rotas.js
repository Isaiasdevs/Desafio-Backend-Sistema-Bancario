// arquivo de rotas do projeto

const express = require('express');
const rotas = express();
const {listarContas, cadastrarConta, atualizarConta, deletarConta, depositar, sacar, transferir, saldo, extrato} = require('./controladores/controladores');
const {validarSenha, validarEmailCpf, validarDados, validarConta} = require('./intermediarios/intermediarios');



rotas.get('/contas', validarSenha , listarContas);
rotas.get('/contas/saldo', saldo);
rotas.get('/contas/extrato', extrato)

rotas.post('/contas', validarEmailCpf, validarDados, cadastrarConta);
rotas.post('/transacoes/depositar', depositar);
rotas.post( '/transacoes/sacar',  sacar);
rotas.post('/transacoes/transferir',  transferir);

rotas.put('/contas/:numeroConta',validarDados, validarEmailCpf, validarConta,  atualizarConta);

rotas.delete('/contas/:numeroConta',  deletarConta);


module.exports = rotas;