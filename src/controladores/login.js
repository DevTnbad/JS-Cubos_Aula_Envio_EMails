const transportador = require('../conexaoEmail');
const compiladorHtml = require('../utils/compiladorHtml');

const usuario = {
    nome: 'Thiago ',
    email: 'dev.tnbad@gmail.com',
    senha: '123abc'
}

const loginTeste = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (email !== usuario.email || senha !== usuario.senha) {
            return res.status(401).json({ mensagem: `Usuário e/ou senha inválido(s).` })
        }

        //fazer envio de email.

        const html = await compiladorHtml('./src/templates/login.html', {
            nomeusuario: usuario.nome,
            api: 'API'
        });

        transportador.sendMail(
            {
                from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`, // sender address
                to: `${usuario.nome} <${usuario.email}>`, // list of receivers
                subject: "Testando integracao usando HTML", // Subject line
                // text: "Testando integracao Mailtrap aula cubos!", // plain text body
                html, // html body
            }
        )

        return res.status(200).json({ mensagem: `Usuário logado !` })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: `Erro no servidor.` })
    }
}

module.exports = {
    loginTeste
}