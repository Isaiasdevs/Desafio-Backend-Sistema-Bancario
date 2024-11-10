// arquivo de rotas do projeto

const express = require('express');
const rotas = express();
const { listarContas, cadastrarConta, atualizarConta, deletarConta, depositar, sacar, transferir, saldo, extrato } = require('./controladores/controladores');
const { validarSenhaBanco, validarEmailCpf, validarDados, validarContaBanco, validardeposito, validarSaque, validarTransferencia, validaSaldoExtrato } = require('./intermediarios/intermediarios');

rotas.get('/contas', validarSenhaBanco, listarContas);
rotas.get('/contas/saldo', validaSaldoExtrato, saldo);
rotas.get('/contas/extrato', validaSaldoExtrato, extrato)

rotas.post('/contas', validarEmailCpf, validarDados, cadastrarConta);
rotas.post('/transacoes/depositar', validardeposito, depositar);
rotas.post('/transacoes/sacar', validarSaque, sacar);
rotas.post('/transacoes/transferir', validarTransferencia, transferir);

rotas.put('/contas/:numeroConta', validarDados, validarEmailCpf, validarContaBanco, atualizarConta);

rotas.delete('/contas/:numeroConta', validarContaBanco, deletarConta);


module.exports = rotas;