/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createUser: async (req, res) => {
    const userContent = req.body;
    User.find({ email: userContent.email }).exec(async (err, user) => {
      if (err) {
        return res.serverError({
          success: false,
          message: 'Server Error' + err
        });
      }

      if (user && user.length) {
        return res.ok({
          success: false,
          message: 'User exits'
        });
      }

      const createUser = {
        userName: userContent.userName,
        password: userContent.password,
        email: userContent.email,
        token: await sails.helpers.generateJwt.with({
          user: userContent,
          secretSignature: 'secret',
          tokenLife: '1h'
        })
      };

      User.create(createUser).exec((err) => {
        if (err) {
          return res.serverError({
            success: false,
            message: 'Server Error' + err
          });
        }
        return res.ok({
          success: true,
          data: userContent
        });
      });

    });
  },

  users: async (req, res) => {
    User.find((err, user) => {
      if (err) {
        return res.serverError({
          success: false,
          message: 'Server Error' + err
        });
      }

      if (typeof user === 'undefined') {
        return res.status(404).json({
          success: false,
          message: 'Not found'
        });
      }
      return res.ok({
        success: true,
        data: user
      });
    });
  },

  login: async (req, res) => {
    const data = req.body;

    await User.findOne({ email: data.email, password: data.password }).exec(async (err, userData) => {
      if (err) {
        return res.serverError({
          success: false,
          message: 'Server Error' + err
        });
      }

      if (!userData) {
        return res.status(404).json({
          success: false,
          message: 'Pass wrong'
        });
      }

      console.log('token 96', userData);

      const token = await sails.helpers.generateJwt.with({
        user: {
          email: userData.email,
          userName: userData.userName
        },
        secretSignature: 'secret',
        tokenLife: '1h'
      });

      console.log('token 96', token, userData);

      const refreshToken = await sails.helpers.generateJwt.with({
        user: {
          email: userData.email,
          userName: userData.userName
        },
        secretSignature: 'secret',
        tokenLife: '2h'
      });

      await User.updateOne({ email: data.email }).set({
        token,
        refreshToken,
      });

      return res.ok({
        success: true,
        data: {
          token,
          refreshToken
        }
      });
    });
  }
};

