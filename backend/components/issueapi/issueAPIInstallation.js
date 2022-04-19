class IssueAPIInstallation {
  async onInstall(Mantra) {
    Mantra.LogInfo('Issue API component installing');
  }

  async onUninstall(Mantra) {
    Mantra.LogInfo('Issue component uninstalling');
  }

  async onInitialize(Mantra) {
    Mantra.LogInfo('Issue component "onInitialize"');
  }

  async onUpdate(Mantra, currentVersion, versionToUpdate) {
    Mantra.LogInfo(`Issue component "onUpdate" - ${currentVersion} -> ${versionToUpdate}`);
  }
}

module.exports = {
  IssueAPIInstallation,
};
