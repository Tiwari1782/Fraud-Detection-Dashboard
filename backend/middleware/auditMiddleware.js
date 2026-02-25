const AuditLog = require('../models/AuditLog');

exports.logAction = (action) => {
  return async (req, res, next) => {
    try {
      if (req.session.adminId) {
        await AuditLog.create({
          admin_id: req.session.adminId,
          action: action,
          details: JSON.stringify({
            method: req.method,
            path: req.path,
            body: req.body
          }),
          ip_address: req.ip || req.connection.remoteAddress,
          user_agent: req.get('user-agent')
        });
      }
    } catch (error) {
      console.error('Audit log error:', error);
    }
    next();
  };
};