const Starter = require('./userStarter');
const Installer = require('./userInstallation');

module.exports = () => ({
  Start: new Starter.UserStarter(),
  Install: new Installer.UserInstallation(),
});
