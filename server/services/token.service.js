const jwt = require("jsonwebtoken");
const sequelize = require("../db");
const { token } = sequelize.models;

class TokenService {
  // payload - tai duomenys, kuriuos tures uzsifruotus jwt
  // cia turetu buti role ir dar kas nors
  // kol kas perduodamas visas userDto
  // REIKES PAKEISTI
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "1d",
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(user_id, refreshToken) {
    // naudotojas gali turėti tik vieną aktyvų refresh tokeną
    // jei jis buvo prisijungęs iš kito įrenginio,
    // po prisijungimo jo tokenas bus perrašytas ir jis bus atjungtas
    // tame irenginyje

    // ziurim, ar juzeris turi tokena?
    const tokenData = await token.findOne({ where: { user_id } });

    // jei turi, tai sena pakeiciam nauju
    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return await tokenData.save();
    }

    // jei neturi, sukuriam nauja
    const tokeN = await token.create({
      refreshToken,
      user_id,
    });

    return tokeN;
  }

  async validateAccessToken(accessToken) {
    return;
  }

  async removeToken(refreshToken) {
    const tokenData = await token.destroy({ where: { refreshToken } });

    return tokenData;
  }
}

module.exports = new TokenService();
