import sequelize from "../db/db.js";
import { DataTypes, FLOAT } from "sequelize";

const {STRING, INTEGER, BOOLEAN, TEXT, JSON } = DataTypes;

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Event = sequelize.define('event')

export default {User, Event}
