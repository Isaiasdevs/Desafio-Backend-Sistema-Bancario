// arquivo de validações no acesso aos dados


const bancoDeDados = require('../bancoDeDados');


// validação de senha. Verifica se a senha foi informada e se corresponde ao banco
const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    const banco = bancoDeDados.banco;

    if (senha_banco === banco.senha) {
        next();
    } else {
        res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
    }
}
// verifica na base de dados se o email e o cpf informados existem
const validarEmailCpf = (req, res, next) => {
    
    const { email, cpf } = req.body;
    const contas = bancoDeDados.contas;

    const conta = contas.find(conta => conta.usuario.email === email && conta.usuario.cpf === cpf);

    if (!conta) {
        next();
    } else {
        res.status(401).json({ mensagem: "O email e o cpf informados já existem!" });
    }
    
   
}



   


module.exports = { validarSenha, validarEmailCpf };