

module.exports = async function isLoggedIn(req, res, next) {
  const accessTokenSecret = 'secret';
  const tokenFromClient = req.headers.authorization;
  if (!tokenFromClient) {
    return res.status(403).json({
      message: 'Unauthorized.'
    });
  }
  const newToken = tokenFromClient.replace('Bearer ', '');
  console.log('tokenFromClient', tokenFromClient, newToken);

  if (tokenFromClient) {
    try {
      await sails.helpers.verifyJwt.with({
        token: newToken,
        secret: accessTokenSecret
      });
      return next();
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized.' + error,
      });
    }
  }

  // Không tìm thấy token trong request
  return res.status(403).send({
    message: 'No token provided.',
  });

};
