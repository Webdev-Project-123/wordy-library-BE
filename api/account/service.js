const { type } = require('express/lib/response');
const db = require('../../models/db');

module.exports = {
  update: async (req) => {
    try {
      const user = await db.get('users').find({ email: req.user.email });

      if (!user.value()) {
        return {
          statusCode: 500,
          msg: 'Error in update',
        };
      }

      const normalProperties = ['name', 'address', 'phone'];
      normalProperties.forEach(async (p) => {
        if (req.body[p]) {
          await user.assign({ [p]: req.body[p] }).write();
        }
      });

      if (req.file) {
        await user.assign({ avatar: req.file.path }).write();
      }

      return {
        statusCode: 200,
        msg: 'OK',
      };
    } catch {
      return {
        statusCode: 500,
        msg: 'Error in update',
      };
    }
  },
  profile: async (email) => {
    try {
      const user = await db.get('users').find({ email }).value();
      console.log(user)
      if (!user) {
        return {
          statusCode: 500,
          msg: 'Error in profile',
        };
      }

      return {
        statusCode: 200,
        msg: 'OK',
        profile: {
          email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          avatar: user.avatar,
          role: user.role,
        },
      };
    } catch {
      return {
        statusCode: 500,
        msg: 'Error in profile',
      };
    }
  },
};
