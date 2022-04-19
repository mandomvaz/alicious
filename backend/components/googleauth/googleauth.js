const Starter = require('./googleauthStarter');
const Installer = require('./googleauthInstallation');

module.exports = () => ({
  Start: new Starter.GoogleAuthStarter(),
  Install: new Installer.GoogleAuthInstallation(),
});
