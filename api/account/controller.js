const accountService = require('./service');

module.exports = {
  update: async (req, res, next) => {
    try {
      const DTO = await accountService.update(req);
      const stt = DTO.statusCode ? DTO.statusCode : 500;
      res.status(stt).json({
        statusCode: stt,
        msg: DTO.msg,
      });
    } catch {
      res.status(500).json({
        statusCode: 500,
        msg: 'Error in update',
      });
    }
  },
  profile: async (req, res, next) => {
    try {
      const DTO = await accountService.profile(req.user.email);
      const stt = DTO.statusCode ? DTO.statusCode : 500;
      res.status(stt).json({
        statusCode: stt,
        msg: DTO.msg,
        profile: DTO.profile,
      });
    } catch {
      res.status(500).json({
        statusCode: 500,
        msg: 'Error in profile',
      });
    }
  },
};
