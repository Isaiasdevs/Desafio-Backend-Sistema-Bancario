const bancoDeDados = require('../bancoDeDados');
const { validarEmailCpf } = require('../intermediarios/intermediarios');


const listarContas = (req, res) => {

    res.status(200).json(bancoDeDados.contas);

}

const cadastrarConta = (req, res) => {
    const { nome, cpf, data_de_nascimento, telefone, email, senha } = req.body;
    
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
    

    const { nome, cpf, data_de_nascimento, telefone, email, senha } = req.body;

    if (!nome && !cpf && !data_de_nascimento && !telefone && !email && !senha) {
        res.status(400).json({ mensagem: " Todos os campos são obrigatórios!" });
        return;
    }

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numeroConta));
   

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

    const deposito = {
        data: new Date().toISOString(),
        numero_conta: numero_conta,
        valor: valor,
    }

    bancoDeDados.depositos.push(deposito);

    
    conta.saldo += valor;
    res.sendStatus(200);
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta && !valor && !senha) {
        res.status(400).json({ mensagem: "Valor, numero da conta e senha são obrigatórios!" });
        return;
    }

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numero_conta));

    if (!conta) {
        res.status(404).json({ mensagem: "Conta não encontrada!" });
        return;
    }

    if (valor <= 0) {
        res.status(400).json({ mensagem: "O valor do saque deve ser maior que zero!" });
        return;
    }

    if (valor > conta.saldo) {
        res.status(400).json({ mensagem: "O valor do saque não pode ser maior que o saldo da conta!" });
        return;
    }

    if( senha !== conta.usuario.senha) {
        res.status(400).json({ mensagem: "Senha incorreta!" });
        return;
    }

    const saque = {
        data: new Date().toISOString(),
        numero_conta: numero_conta,
        valor: valor,
    }

    bancoDeDados.saques.push(saque);

    conta.saldo -= valor;
    res.sendStatus(200);
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;    
    
    if (!numero_conta_origem && !valor && !numero_conta_destino && !senha) {
        res.status(400).json({ mensagem: "Valor, numero da conta, numero do destinatário e senha são obrigatórios!" });
        return;
    }       

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numero_conta_origem));    
    const destinatario = bancoDeDados.contas.find(conta => conta.numero === Number(numero_conta_destino));       

    if (!conta) {
        res.status(404).json({ mensagem: "Conta não encontrada!" });
        return;
    }

    if (!destinatario) {
        res.status(404).json({ mensagem: "Conta de destino não encontrada!" });
        return;
    }

    if (valor <= 0) {
        res.status(400).json({ mensagem: "O valor do transferência deve ser maior que zero!" });
        return;
    }   

    if (valor > conta.saldo) {
        res.status(400).json({ mensagem: "Saldo insuficiente!" });
        return;
    }

    if( senha !== conta.usuario.senha) {
        res.status(401).json({ mensagem: "Senha incorreta!" });
        return;
    }

    const transferencia = {
        data: new Date().toISOString(),
        numero_conta_origem: numero_conta_origem,
        valor: valor,
        numero_conta_destino: numero_conta_destino,
    }

    bancoDeDados.transferencias.push(transferencia);

    conta.saldo -= valor;
    destinatario.saldo += valor;
    res.sendStatus(200);
}


const saldo = (req, res) => {
    const { numero_conta, senha } = req.query; 
    

    if (!numero_conta && !senha) {
        res.status(400).json({ mensagem: "Numero da conta e senha são obrigatórios!" });
        return;
    }

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numero_conta));

    if (!conta) {
        res.status(404).json({ mensagem: "Conta não encontrada!" });
        return;
    }

    if (senha !== conta.usuario.senha) {
        res.status(401).json({ mensagem: "Senha incorreta!" });
        return;
    }

    res.json({ saldo: conta.saldo });

};

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;
    
    if (!numero_conta || !senha) {
        res.status(400).json({ mensagem: "Número da conta e senha são obrigatórios!" });
        return;
    }   

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numero_conta));    
    
    if (!conta) {
        res.status(404).json({ mensagem: "Conta não encontrada!" });
        return;
    }

    if (senha !== conta.usuario.senha) {
        res.status(401).json({ mensagem: "Senha incorreta!" });
        return;
    }

    // Filtrando as operações pelo número da conta
    const depositos = bancoDeDados.depositos.filter(deposito => deposito.numero_conta === numero_conta);
    const saques = bancoDeDados.saques.filter(saque => saque.numero_conta === numero_conta);
    const transferenciasEnviadas = bancoDeDados.transferencias.filter(
        transferencia => transferencia.numero_conta_origem === numero_conta
    );
    const transferenciasRecebidas = bancoDeDados.transferencias.filter(
        transferencia => transferencia.numero_conta_destino === numero_conta
    );

    // Criando o extrato detalhado
    const extratoDetalhado = {
        depositos,
        saques,
        transferenciasEnviadas,
        transferenciasRecebidas,
    };

    res.json(extratoDetalhado);
    
};








module.exports = { listarContas, cadastrarConta, atualizarConta, deletarConta, depositar, sacar, transferir, saldo, extrato };

