import {DataTypes, Model} from "sequelize";
import sequelize from "../config/db.js";

class User extends Model {
}

User.init({
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    confirmPassword: {
        type: DataTypes.VIRTUAL,
    },
}, {
    sequelize,
    modelName: "User",
    timestamps: false,
    validate: {
        passwordsMatch() {
            if (this.password !== this.confirmPassword) {
                throw new Error("Паролі не співпадають");
            }
        }
    }
});

export default User;