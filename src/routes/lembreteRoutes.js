const express = require("express");

const {
    criarLembrete,
    listarLembretes,
    atualizarLembrete,
    excluirLembrete
} = require("../controllers/lembreteController");

const {
    autenticar
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/lembretes",
    autenticar,
    criarLembrete
);

router.get(
    "/lembretes",
    autenticar,
    listarLembretes
);

router.put(
    "/lembretes/:id",
    autenticar,
    atualizarLembrete
);

router.delete(
    "/lembretes/:id",
    autenticar,
    excluirLembrete
);

module.exports = router;