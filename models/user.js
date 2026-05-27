const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const User = sequelize.define("users", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  age:{
    type:DataTypes.INTEGER,
    allowNull: false
  }
},{
    timestamps: false 
  });

  

module.exports = User;