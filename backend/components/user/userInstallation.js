class UserInstallation {
  async onInstall(Mantra) {
    Mantra.LogInfo('User component installing schema');
    await Mantra.InstallSchema('user');
  }

  async onUninstall(Mantra) {
    Mantra.LogInfo('User component uninstalling schema');
    await Mantra.UninstallSchema('user');
  }

  async onInitialize(Mantra) {
    Mantra.LogInfo('User component "onInitialize"');
  }

  async onUpdate(Mantra, currentVersion, versionToUpdate) {
    Mantra.LogInfo(`User component "onUpdate" - ${currentVersion} -> ${versionToUpdate}`);
  }
}

module.exports = {
  UserInstallation,
};
