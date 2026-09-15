const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                mensagem: "Token não informado."
            });
        }

        const partes = authorization.split(" ");

        if (
            partes.length !== 2 ||
            partes[0] !== "Bearer"
        ) {
            return res.status(401).json({
                mensagem: "Formato do token inválido."
            });
        }

        const token = partes[1];

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado."
        });
    }
};

const autorizar = (...perfisPermitidos) => {
    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(401).json({
                mensagem: "Usuário não autenticado."
            });
        }

        if (!perfisPermitidos.includes(req.usuario.perfil)) {
            return res.status(403).json({
                mensagem: "Você não possui permissão para esta ação."
            });
        }

        next();
    };
};

module.exports = {
    autenticar,
    autorizar
};