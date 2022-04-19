class IssueInstallation {
  async onInstall(Mantra) {
    Mantra.LogInfo('Issue component installing schema');
    await Mantra.InstallSchema('issue');
  }

  async onUninstall(Mantra) {
    Mantra.LogInfo('Issue component uninstalling schema');
    await Mantra.UninstallSchema('issue');
  }

  async onInitialize(Mantra) {
    Mantra.LogInfo('Issue component "onInitialize"');
  }

  async onUpdate(Mantra, currentVersion, versionToUpdate) {
    Mantra.LogInfo(`Issue component "onUpdate" - ${currentVersion} -> ${versionToUpdate}`);
  }
}

module.exports = {
  IssueInstallation,
};
