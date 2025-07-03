import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db.js";

class Movie extends Model {}

Movie.init({
    title: {
        type: DataTypes.STRING,
    },
    year: {
        type: DataTypes.STRING,
    },
    format: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    modelName: "Movie",
    timestamps: false,
});

// TODO: handle sequelize errors

export default Movie;