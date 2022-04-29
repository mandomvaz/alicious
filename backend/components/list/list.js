const Starter = require('./listStarter');
const Installer = require('./listInstallation');

module.exports = () => ({
  Start: new Starter.ListStarter(),
  Install: new Installer.ListInstallation(),
});
