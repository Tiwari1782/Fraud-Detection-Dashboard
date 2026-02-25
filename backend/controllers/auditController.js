const AuditLog = require('../models/AuditLog');
const Admin = require('../models/Admin');

exports.showAuditLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;
    const offset = (page - 1) * limit;

    const { count, rows } = await AuditLog.findAndCountAll({
      order: [['created_at', 'DESC']],
      limit,
      offset,
      include: [{
        model: Admin,
        attributes: ['username'],
        required: false
      }]
    });

    const totalPages = Math.ceil(count / limit);

    res.render('auditLogs', {
      logs: rows,
      currentPage: page,
      totalPages,
      totalCount: count
    });

  } catch (error) {
    console.error('Audit logs error:', error);
    res.status(500).send('Error loading audit logs');
  }
};