const express = require("express");

const {
    criarBuque,
    listarBuques,
    buscarBuque
} = require("../controllers/buqueController");

const {
    autenticar
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/buques",
    autenticar,
    criarBuque
);

router.get(
    "/buques",
    autenticar,
    listarBuques
);

router.get(
    "/buques/:id",
    autenticar,
    buscarBuque
);

module.exports = router;