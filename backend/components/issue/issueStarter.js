class IssueStarter {
  async onStart(Mantra) {
    Mantra.LogInfo('New component issue installed!');
  }
}

module.exports = {
  IssueStarter,
};
