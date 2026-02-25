const Settings = require('../models/Settings');

exports.showSettings = async (req, res) => {
  try {
    const settings = await Settings.findAll();
    
    // Convert to key-value object
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.setting_key] = s.setting_value;
    });

    res.render('settings', {
      settings: settingsObj,
      error: null,
      success: null
    });

  } catch (error) {
    console.error('Settings error:', error);
    res.status(500).send('Error loading settings');
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { fraud_threshold, alert_email, daily_report } = req.body;

    // Update or create settings
    await Settings.upsert({
      setting_key: 'fraud_threshold',
      setting_value: fraud_threshold || '0.7',
      description: 'Threshold for high-risk alerts (0-1)'
    });

    await Settings.upsert({
      setting_key: 'alert_email',
      setting_value: alert_email || process.env.ADMIN_EMAIL || '',
      description: 'Email for fraud alerts'
    });

    await Settings.upsert({
      setting_key: 'daily_report',
      setting_value: daily_report || 'false',
      description: 'Enable daily reports'
    });

    const settings = await Settings.findAll();
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.setting_key] = s.setting_value;
    });

    res.render('settings', {
      settings: settingsObj,
      error: null,
      success: 'Settings updated successfully!'
    });

  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).send('Error updating settings');
  }
};