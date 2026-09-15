const express = require("express");
const {
  cadastrarUsuario,
  login,
  me, 
} = require("../controllers/authController");
const { autenticar } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/auth/register", cadastrarUsuario);
router.post("/auth/login", login);
router.get("/auth/me", autenticar, me); // rota protegida

module.exports = router;