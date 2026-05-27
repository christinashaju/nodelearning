const { Sequelize } = require("sequelize");

// Create connection
// direct connection string
const sequelize = new Sequelize(
    "postgresql://postgres.afutioapoaruxmdvyaar:8B6J05EtByiV8WoA@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres",
    {
      dialect: "postgres"
    }
  );

// Test connection (important for interview)
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = { sequelize, connectDB };