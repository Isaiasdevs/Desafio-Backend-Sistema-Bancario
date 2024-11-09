// arquivo de validações no acesso aos dados


const bancoDeDados = require('../bancoDeDados');


const validarSenha = (req, res, next) => {
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

const validarConta = (req, res, next) => {
    const { numeroConta } = req.params;

    const conta = bancoDeDados.contas.find(conta => conta.numero === Number(numeroConta));

    if (!conta) {
        res.status(404).json({ mensagem: "Conta não encontrada!" });
        return;
    }

    next();
}






module.exports = { validarSenha, validarEmailCpf, validarDados, validarConta };