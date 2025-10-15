import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

const Schema = sequelize.define('game', {
    
    gameId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
  
    sport: {
        type: DataTypes.STRING,
        allowNull: false
    },
  
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },

    number_of_people: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    reservation_date: {

        type: DataTypes.DATEONLY,
        allowNull: false
    },

    reservation_time: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {

});

await Schema.sync({ alter: true });

export default Schema;
