const bancoDeDados = require('../bancoDeDados');


const listarContas = (req, res) => {

    res.send(bancoDeDados.contas);

}

const cadastrarConta = (req, res) => {
    const { nome, cpf, nudata_de_nascimento, telefone, email, senha } = req.body;
    const numero = bancoDeDados.contas.length + 1;

    const conta = {
        numero: numero,
        saldo: 0,
        usuario: {
        nome,
        cpf,
        nudata_de_nascimento,
        telefone,
        email,
        senha,
    }

    }
    bancoDeDados.contas.push(conta);
    
    res.sendStatus(201);
}

module.exports = {listarContas, cadastrarConta};  

