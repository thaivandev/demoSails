/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  test: (req, res) => {
    return res.ok({
      success: true,
      message: 'test oke'
    })
  }

};

