require("dotenv").config();
const port = process.env.PORT || 3003;
const sequelize = require("./db");

const app = require("./app");

const startServer = async () => {
  try {
    // prisijungiam prie db
    await sequelize.authenticate();

    // sinchronizuojam modelius su db
    // produksine nepatartina
    await sequelize.sync({ force: true });

    app.listen(port, () => {
      console.log(`Serveris veikia. Prievadas: ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
