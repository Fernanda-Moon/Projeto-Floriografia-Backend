const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Nome, email e senha são obrigatórios."
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                mensagem: "A senha deve possuir pelo menos 6 caracteres."
            });
        }

        const usuarioExistente = await Usuario.findOne({
            email: email.toLowerCase()
        });

        if (usuarioExistente) {
            return res.status(400).json({
                mensagem: "Este email já está cadastrado."
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await Usuario.create({
            nome,
            email: email.toLowerCase(),
            senha: senhaCriptografada
        });

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao cadastrar usuário.",
            erro: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Email e senha são obrigatórios."
            });
        }

        const usuario = await Usuario.findOne({
            email: email.toLowerCase()
        });

        if (!usuario) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos."
            });
        }

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos."
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            token,
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao realizar login.",
            erro: error.message
        });
    }
};

// Obter dados do usuário autenticado
const me = async (req, res) => {
  try {
    // req.usuario é populado pelo middleware autenticar
    const usuario = await Usuario.findById(req.usuario.id).select("-senha");
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar dados do usuário.",
      erro: error.message,
    });
  }
};

module.exports = {
  cadastrarUsuario,
  login,
  me, 
};