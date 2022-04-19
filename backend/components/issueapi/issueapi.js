const issueAPIStarter = require('./issueAPIStarter');
const issueAPIInstallation = require('./issueAPIInstallation');

module.exports = () => ({
  Start: new issueAPIStarter.IssueAPIStarter(),
  Install: new issueAPIInstallation.IssueAPIInstallation(),
});
