const ApiError = require('../exceptions/api.errors');
const tokenService = require('../services/token.service');

module.exports = function (req, res, next) {
  try {
    // cia turi buti prikabintas tokenas
    const authorizationHeader = req.headers.authorization;

    console.log(authorizationHeader);

    if (!authorizationHeader) throw new ApiError.UnauthorizedError();

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) throw new ApiError.UnauthorizedError();

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) throw new ApiError.UnauthorizedError();

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
