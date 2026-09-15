const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

// Listar todos os usuários (apenas admin)
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-senha");
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar usuários.",
      erro: error.message,
    });
  }
};

// Buscar um usuário por ID (admin ou próprio usuário)
const buscarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id).select("-senha");
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    // Verifica se é o próprio usuário ou admin
    if (req.usuario.id !== id && req.usuario.perfil !== "admin") {
      return res.status(403).json({
        mensagem: "Você não tem permissão para visualizar este usuário.",
      });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar usuário.",
      erro: error.message,
    });
  }
};

// Atualizar usuário (próprio usuário ou admin)
const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, perfil } = req.body;

    // Verifica permissão
    if (req.usuario.id !== id && req.usuario.perfil !== "admin") {
      return res.status(403).json({
        mensagem: "Você não tem permissão para alterar este usuário.",
      });
    }

    // Se for admin e quiser alterar perfil, permite
    // Caso contrário, mantém o perfil atual
    const dadosAtualizacao = { nome, email };
    if (req.usuario.perfil === "admin" && perfil) {
      dadosAtualizacao.perfil = perfil;
    }

    // Se houver nova senha, faz o hash
    if (senha) {
      if (senha.length < 6) {
        return res.status(400).json({
          mensagem: "A nova senha deve ter pelo menos 6 caracteres.",
        });
      }
      dadosAtualizacao.senha = await bcrypt.hash(senha, 10);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, dadosAtualizacao, {
      new: true,
      runValidators: true,
    }).select("-senha");

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar usuário.",
      erro: error.message,
    });
  }
};

// Excluir usuário (apenas admin)
const excluirUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.usuario.perfil !== "admin") {
      return res.status(403).json({
        mensagem: "Apenas administradores podem excluir usuários.",
      });
    }
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    res.status(200).json({ mensagem: "Usuário excluído com sucesso." });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao excluir usuário.",
      erro: error.message,
    });
  }
};

module.exports = {
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  excluirUsuario,
};