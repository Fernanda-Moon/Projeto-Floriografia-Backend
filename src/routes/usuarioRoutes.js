const express = require("express");
const {
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  excluirUsuario,
} = require("../controllers/usuarioController");
const { autenticar, autorizar } = require("../middlewares/authMiddleware");

const router = express.Router();

// Rotas protegidas por autenticação
router.get("/usuarios", autenticar, autorizar("admin"), listarUsuarios);
router.get("/usuarios/:id", autenticar, buscarUsuario);
router.put("/usuarios/:id", autenticar, atualizarUsuario);
router.delete("/usuarios/:id", autenticar, autorizar("admin"), excluirUsuario);

module.exports = router;