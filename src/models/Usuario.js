const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        senha: {
            type: String,
            required: true
        },

        perfil: {
            type: String,
            enum: ["usuario", "admin"],
            default: "usuario"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Usuario", usuarioSchema);