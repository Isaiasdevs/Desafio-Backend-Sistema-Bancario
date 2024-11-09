const bancoDeDados = require('../bancoDeDados');
const { validarEmailCpf } = require('../intermediarios/intermediarios');


const listarContas = (req, res) => {

    res.status(200).json(bancoDeDados.contas);

}

const cadastrarConta = (req, res) => {
    
    const usuario = req.body;
    
    const numero = bancoDeDados.contas.length + 1;

    const conta = {
        numero: numero,
        saldo: 0,
        usuario: {
            nome: usuario.nome,
            cpf: usuario.cpf,
            data_de_nascimento: usuario.data_de_nascimento,
            telefone: usuario.telefone,
            email: usuario.email,
            senha: usuario.senha,
        }

    }
    bancoDeDados.contas.push(conta);

    res.sendStatus(204);
}

const atualizarConta = (req, res) => {
 
    const { numeroConta } = req.params;
    
    const { nome, cpf, data_de_nascimento, telefone, email, senha } = req.body;
    
   const contaAtualizada= bancoDeDados.contas.find(conta => conta.numero === Number(numeroConta));

   Object.assign(contaAtualizada.usuario, { nome, cpf, data_de_nascimento, telefone, email, senha });// object assign é uma função que permite atualizar um objeto com outro objeto

   res.status(204).send();

}
const deletarConta = (req, res) => {

    const { numeroConta } = req.params;

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numeroConta));
    if (conta.saldo === 0) {
        bancoDeDados.contas.splice(bancoDeDados.contas.indexOf(conta), 1);
        res.sendStatus(204);
    } else {
        res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    }

}

const depositar = (req, res) => {

    const { numero_conta, valor } = req.body;


    const deposito = {
        data: new Date().toISOString(),
        numero_conta: numero_conta,
        valor: valor,
    }

    bancoDeDados.depositos.push(deposito);

    
    bancoDeDados.contas.find(conta => conta.numero === Number(numero_conta)).saldo += valor;
    
    res.status(204).send();
}

const sacar = (req, res) => {
    const { numero_conta, valor } = req.body;
   
    const saque = {
        data: new Date().toISOString(),
        numero_conta: numero_conta,
        valor: valor,
    }

    bancoDeDados.saques.push(saque);   

    bancoDeDados.contas.find(conta => conta.numero === Number(numero_conta)).saldo -= valor;
    res.status(204).send();
}

const transferir = (req, res) => {
    
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;  
   
    const transferencia = {
        data: new Date().toISOString(),
        numero_conta_origem: numero_conta_origem,
        valor: valor,
        numero_conta_destino: numero_conta_destino,
    }

    bancoDeDados.transferencias.push(transferencia);

    bancoDeDados.contas.find(conta => conta.numero === Number(numero_conta_origem)).saldo -= valor;
    bancoDeDados.contas.find(conta => conta.numero === Number(numero_conta_destino)).saldo += valor;    
    res.status(204).send(); 

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

