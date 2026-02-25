const Admin = require('../models/Admin');

exports.showLogin = (req, res) => {
  if (req.session.adminId) {
    return res.redirect('/dashboard');
  }
  res.render('login', { error: null });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ where: { username } });

    if (!admin || !(await admin.validPassword(password))) {
      return res.render('login', { error: 'Invalid credentials' });
    }

    req.session.adminId = admin.id;
    req.session.username = admin.username;
    res.redirect('/dashboard');

  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'Login failed' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};

// First-time setup (run once to create admin)
exports.setupAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.send('Admin already exists');
    }

    await Admin.create({
      username: 'admin',
      password: 'admin123',
      email: 'admin@frauddetection.com'
    });

    res.send('Admin created! Username: admin, Password: admin123');
  } catch (error) {
    res.status(500).send('Setup failed');
  }
};