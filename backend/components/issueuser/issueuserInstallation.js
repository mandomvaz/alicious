class IssueUserInstallation {
  async onInstall(Mantra) {
    Mantra.LogInfo('IssueUser component installing schema');
    await Mantra.InstallSchema('issueuser');

    const db = Mantra.ComponentEntities('issueuser').issueuser;

    const issueusertoinsert = {
      iid: '0',
      uid: '0',
      owner: true,
    };

    await db.I().V(issueusertoinsert).R();
  }

  async onUninstall(Mantra) {
    Mantra.LogInfo('IssueUser component uninstalling schema');
    await Mantra.UninstallSchema('issueuser');
  }

  async onInitialize(Mantra) {
    Mantra.LogInfo('IssueUser component "onInitialize"');
  }

  async onUpdate(Mantra, currentVersion, versionToUpdate) {
    Mantra.LogInfo(`IssueUser component "onUpdate" - ${currentVersion} -> ${versionToUpdate}`);
  }
}

module.exports = {
  IssueUserInstallation,
};
