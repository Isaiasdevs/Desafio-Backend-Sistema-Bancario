// arquivo de validações no acesso aos dados


const bancoDeDados = require('../bancoDeDados');


// validação de senha. Verifica se a senha foi informada e se corresponde ao banco
const validarSenha = (req, res, next) => {
    const {senha_banco} = req.query;
    console.log(senha_banco);
    
    const banco = bancoDeDados.banco;

    if (senha_banco === banco.senha) {
        next();
    } else {
        res.status(401).json({mensagem: "A senha do banco informada é inválida!"});    
    }
}


module.exports = {validarSenha};