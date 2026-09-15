const express = require("express");

const {
    listarFavoritos,
    adicionarFavorito,
    removerFavorito
} = require("../controllers/favoritoController");

const {
    autenticar
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/favoritos",
    autenticar,
    listarFavoritos
);

router.post(
    "/favoritos",
    autenticar,
    adicionarFavorito
);

router.delete(
    "/favoritos/:florId",
    autenticar,
    removerFavorito
);

module.exports = router;