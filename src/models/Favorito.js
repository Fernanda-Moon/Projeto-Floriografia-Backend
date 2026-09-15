const mongoose = require("mongoose");

const favoritoSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },

        flor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flor",
            required: true
        }
    },
    {
        timestamps: true
    }
);

favoritoSchema.index(
    {
        usuario: 1,
        flor: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "Favorito",
    favoritoSchema
);