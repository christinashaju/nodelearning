const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Students = sequelize.define("students", {
    studentid:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    branch:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
      type:DataTypes.INTEGER,
    allowNull: false
    },
    registered:{
      type:DataTypes.BOOLEAN,
      allowNull: false
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    last_fetchedat:{
      type:DataTypes.TIME
    }
  },{
    timestamps: false 
  });

  module.exports = Students;