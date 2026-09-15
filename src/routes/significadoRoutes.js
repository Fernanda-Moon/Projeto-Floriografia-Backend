const express = require("express");

const {
    listarSignificados,
    criarSignificado
} = require("../controllers/significadoController");

const {
    autenticar,
    autorizar
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/significados",
    listarSignificados
);

router.post(
    "/significados",
    autenticar,
    autorizar("admin"),
    criarSignificado
);

module.exports = router;