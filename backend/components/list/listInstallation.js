class ListInstallation {
  async onInstall(Mantra) {
    Mantra.LogInfo('List component installing schema');
    await Mantra.InstallSchema('list');
  }

  async onUninstall(Mantra) {
    Mantra.LogInfo('List component uninstalling schema');
    await Mantra.UninstallSchema('list');
  }

  async onInitialize(Mantra) {
    Mantra.LogInfo('List component "onInitialize"');
  }

  async onUpdate(Mantra, currentVersion, versionToUpdate) {
    Mantra.LogInfo(`List component "onUpdate" - ${currentVersion} -> ${versionToUpdate}`);
  }
}

module.exports = {
  ListInstallation,
};
