const Starter = require('./issueStarter');
const Installer = require('./issueInstallation');

module.exports = () => ({
  Start: new Starter.IssueStarter(),
  Install: new Installer.IssueInstallation(),
});
