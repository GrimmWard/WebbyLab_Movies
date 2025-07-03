import {Sequelize} from "sequelize"
import 'dotenv/config'

const sequelize = new Sequelize('movies', 'dev', 'pass', {
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
    logging: false,
})

export default sequelize