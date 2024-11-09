// arquivo de validações no acesso aos dados


const bancoDeDados = require('../bancoDeDados');


const validarSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        res.status(400).json({ mensagem: "A senha do banco é obrigatória!" });
        return;
    }

    const banco = bancoDeDados.banco;

    if (senha_banco === banco.senha) {
        next();
    } else {
        res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
    }
}

const validarDados = (req, res, next) => {
    const { nome, cpf, data_de_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_de_nascimento || !telefone || !email || !senha) {
        res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
        return;
    }

    next();
}

const validarEmailCpf = (req, res, next) => {

    const { email, cpf } = req.body;
    const contas = bancoDeDados.contas;

    const conta = contas.find(conta => conta.usuario.email === email || conta.usuario.cpf === cpf);

    if (!conta) {
        next();
    } else {
        res.status(401).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
    }


}

const validarContaBanco = (req, res, next) => {
    const { numeroConta } = req.params;

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numeroConta));

    if (!conta) {
        res.status(404).json({ mensagem: "Conta não encontrada!" });
        return;
    }

    next();
}


const validardeposito = (req, res, next) => {
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

    next();
}


const validarSaque = (req, res, next) => {

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

    next();
}

const validarTransferencia = (req, res, next) => {
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

    next();
}







module.exports = { validarContaBanco, validarEmailCpf, validarDados, validarSenhaBanco, validardeposito, validarSaque, validarTransferencia };