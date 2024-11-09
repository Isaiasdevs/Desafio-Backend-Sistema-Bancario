const bancoDeDados = require('../bancoDeDados');
const { validarEmailCpf } = require('../intermediarios/intermediarios');


const listarContas = (req, res) => {

    res.status(200).json(bancoDeDados.contas);

}

const cadastrarConta = (req, res) => {
    const { nome, cpf, data_de_nascimento, telefone, email, senha } = req.body;
    console.log(data_de_nascimento);
    const numero = bancoDeDados.contas.length + 1;

    const conta = {
        numero: numero,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_de_nascimento,
            telefone,
            email,
            senha,
        }

    }
    bancoDeDados.contas.push(conta);

    res.sendStatus(201);
}


// Atualizar usuário da conta bancária
const atualizarConta = (req, res) => {

    const { numeroConta } = req.params;
    console.log(numeroConta);

    const { nome, cpf, data_de_nascimento, telefone, email, senha } = req.body;

    if (!nome && !cpf && !data_de_nascimento && !telefone && !email && !senha) {
        res.status(400).json({ mensagem: " Todos os campos são obrigatórios!" });
        return;
    }

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numeroConta));
    console.log(conta);

    if (!conta) {
        res.status(404).json({ mensagem: "Conta não encontrada!" });
        return;
    }

    // chamada da função de validação de cpf e email
    validarEmailCpf(req, res, () => {

        if (nome) conta.usuario.nome = nome;
        if (cpf) conta.usuario.cpf = cpf;
        if (data_de_nascimento) conta.usuario.data_de_nascimento = data_de_nascimento;
        if (telefone) conta.usuario.telefone = telefone;
        if (email) conta.usuario.email = email;
        if (senha) conta.usuario.senha = senha;

        res.sendStatus(200);
    });
}

// Deletar conta bancária
const deletarConta = (req, res) => {

    const { numeroConta } = req.params;

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numeroConta));

    if (!conta) {
        res.status(404).json({ mensagem: "Conta não encontrada!" });
        return;
    }

    //verificia se o saldo da conta é = 0, se sim, excluir conta informada
    if (conta.saldo === 0) {
        bancoDeDados.contas.splice(bancoDeDados.contas.indexOf(conta), 1);
        res.sendStatus(200);
    } else {
        res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    }

}

const depositar = (req, res) => {

    const { numero_conta, valor } = req.body;
    
    if (!numero_conta && !valor) {
        res.status(400).json({ mensagem: "Valor e numero da conta são obrigatórios!" });
        return;
    }

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numero_conta));

    if (!conta) {
        res.status(404).json({ mensagem: "Conta não encontrada!" });
        return;
    }


    if (valor <= 0) {
        res.status(400).json({ mensagem: "O valor do depósito deve ser maior que zero!" });
        return;
    }

    conta.saldo += valor;
    res.sendStatus(200);
}




module.exports = { listarContas, cadastrarConta, atualizarConta, deletarConta, depositar };

