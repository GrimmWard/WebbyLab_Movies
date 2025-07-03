import {DataTypes, Model} from 'sequelize';
import sequelize from "../config/db.js";


class Actor extends Model {
}

Actor.init({
    name: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Actor',
    timestamps: false,

});

export default Actor;
