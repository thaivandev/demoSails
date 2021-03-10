module.exports = {


  friendlyName: 'Generate jwt',


  description: '',


  inputs: {
    user: {
      type: 'ref',
      example: 'Ami',
      description: 'The name of the person to greet.'
    },
    secretSignature: {
      type: 'string'
    },
    tokenLife: {
      type: 'string'
    }
  },

  exits: {
    success: {
      outputType: {
        generateToken: 'string'
      }
    }
  },

  fn: async function (inputs) {
    const jwt = require("jsonwebtoken");
    const generateToken = jwt.sign({
      data: inputs.user
    }, inputs.secretSignature, { expiresIn: inputs.tokenLife });

    return generateToken;
  }
};

