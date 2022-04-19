const IssueUserInstallation = require('./issueuserInstallation');
const IssueUserStarter = require('./issueuserStarter');

module.exports = () => ({
  Start: new IssueUserStarter.IssueUserStarter(),
  Install: new IssueUserInstallation.IssueUserInstallation(),
});
