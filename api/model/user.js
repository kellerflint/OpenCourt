import sequelize from "../db/db.js";
import { DataTypes, FLOAT } from "sequelize";

const {STRING, INTEGER, BOOLEAN, TEXT, JSON } = DataTypes;

const User = sequelize.define('user')

const Event = sequelize.define('event')

export default {User, Event}
