class GoogleAuthInstallation {
  async onInstall(Mantra) {
    Mantra.LogInfo('User component installing schema');
  }

  async onUninstall(Mantra) {
    Mantra.LogInfo('GoogleAuth component uninstalling schema');
  }

  async onInitialize(Mantra) {
    Mantra.LogInfo('GoogleAuth component "onInitialize"');
  }

  async onUpdate(Mantra, currentVersion, versionToUpdate) {
    Mantra.LogInfo(`GoogleAuth component "onUpdate" - ${currentVersion} -> ${versionToUpdate}`);
  }
}

module.exports = {
  GoogleAuthInstallation,
};
