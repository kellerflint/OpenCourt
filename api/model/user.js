import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

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

const Event = sequelize.define('event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reservation_time: DataTypes.TIME
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number_of_people: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reservation_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}
)

export { User, Event };