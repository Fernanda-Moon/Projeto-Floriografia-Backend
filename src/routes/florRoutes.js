const express = require("express");

const {
    listarFlores,
    buscarFlor,
    criarFlor,
    atualizarFlor,
    excluirFlor
} = require("../controllers/florController");

const {
    autenticar,
    autorizar
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/flores", listarFlores);

router.get("/flores/:id", buscarFlor);

router.post(
    "/flores",
    autenticar,
    autorizar("admin"),
    criarFlor
);

router.put(
    "/flores/:id",
    autenticar,
    autorizar("admin"),
    atualizarFlor
);

router.delete(
    "/flores/:id",
    autenticar,
    autorizar("admin"),
    excluirFlor
);

module.exports = router;