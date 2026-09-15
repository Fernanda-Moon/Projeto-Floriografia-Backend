const express = require("express");

const {
    listarOcasioes,
    criarOcasiao
} = require("../controllers/ocasiaoController");

const {
    autenticar,
    autorizar
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/ocasioes",
    listarOcasioes
);

router.post(
    "/ocasioes",
    autenticar,
    autorizar("admin"),
    criarOcasiao
);

module.exports = router;