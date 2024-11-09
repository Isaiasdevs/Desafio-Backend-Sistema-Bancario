# Desafio Backend Sistema Bancário

## Descrição

Este é um desafio para novos desenvolvedores, que como eu, estão começando no mundo do desenvolvimento web. O objetivo é desenvolver um sistema bancário simples com algumas funcionalidades básicas. 
Está API possui as seguintes funcionalidades:

- Criar conta bancária
- Listar contas bancárias
- Atualizar os dados do usuário da conta bancária
- Excluir uma conta bancária
- Depósitar em uma conta bancária
- Sacar de uma conta bancária
- Transferir valores entre contas bancárias
- Consultar saldo da conta bancária
- Emitir extrato bancário

Os dados serão persistidos em memória, no objeto existente dentro do arquivo bancodedados.js. Todas as transações e contas bancárias deverão ser inseridas dentro deste objeto, seguindo a estrutura que já existe.

Estrutura do objeto no arquivo `bancoDeDados.js`:

```javascript
const = bancoDeDados{
    banco: {
        nome: "Social Bank",
        numero: "123",
        agencia: "0001",
        senha: "Social123",
    },
    contas: [
        // array de contas bancárias
    ],
    saques: [
        // array de saques
    ],
    depositos: [
        // array de depósitos
    ],
    transferencias: [
        // array de transferências
    ],
}
```



## Tecnologias Utilizadas

- Node.js
- Express
- nodemon

## Instalação

1. Clone o repositório
2. Entre na pasta do projeto
3. Instale as dependências
4. Execute o comando `npm run dev`

## Como rodar o projeto

Para rodar o projeto, execute o comando `npm run dev` na pasta do projeto. O projeto será executado em `http://localhost:3000`.


## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com o projeto, basta seguir os passos abaixo:

1. Fork o repositório
2. Clone o seu fork
3. Crie uma nova branch com um nome descritivo para sua alteração
4. Commit suas alterações
5. Envie um pull request para o repositório original

Lembre-se de seguir o nosso [código de conduta](CODE_OF_CONDUCT.md).

## Autor

- [Github](https://github.com/Isaiasdevs)
- [Home ](https://isaiasdevs.github.io/landing-page/)
- [Linkedin](https://www.linkedin.com/in/isaias-ara%C3%BAjo/)

## Referências

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [nodemon](https://nodemon.io/)
- [Cubos Academy](https://cubos.academy/?utm_medium=cpc&utm_source=google&utm_term=cubos%20academy&utm_campaign=Conversion+-+Search+-+Branding+-+Cubos+Academy&hsa_acc=5207290999&hsa_cam=20983879844&hsa_grp=157905447106&hsa_ad=689370262212&hsa_src=g&hsa_tgt=kwd-1212716925774&hsa_kw=cubos%20academy&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQiA57G5BhDUARIsACgCYnxrf14GZFBS2uy7sNZOsSz8-bM9y2-0E5EZYoZ__ugzZT0Sq2DIWLEaAkCGEALw_wcB)

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.