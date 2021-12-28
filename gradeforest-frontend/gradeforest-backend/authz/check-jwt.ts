var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
export const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://alitnet.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://gradeforest.api',
  issuer: 'https://alitnet.auth0.com/',
  algorithms: ['RS256'],
});
