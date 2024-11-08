const bancoDeDados = require('../bancoDeDados');


const listarContas = (req, res) => {
    
    res.send(bancoDeDados.contas);

}

module.exports = {listarContas};  

