module.exports = {

  friendlyName: 'Verify jwt',
  description: '',

  inputs: {
    token: {
      type: 'string'
    },
    secret: {
      type: 'string'
    }
  },

  exits: {
    success: {
      description: 'All done.',
      outputType: {
        decoded: 'string'
      }
    },
  },

  fn: async function (inputs) {
    const jwt = require("jsonwebtoken");
    return new Promise((resolve, reject) => {
      jwt.verify(inputs.token, inputs.secret, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        resolve(decoded);
      });
    });
  }
};

