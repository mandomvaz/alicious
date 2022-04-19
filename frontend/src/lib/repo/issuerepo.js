function retrieveIssues() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const actualIssuesSTR = localStorage.getItem('ISSUES');
      resolve((actualIssuesSTR === null) ? [] : JSON.parse(actualIssuesSTR));
    }, 1000);
  });
}

async function addIssue(issue) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const actualIssuesSTR = localStorage.getItem('ISSUES');
      const actualIssues = (actualIssuesSTR === null) ? [] : JSON.parse(actualIssuesSTR);
      localStorage.setItem('ISSUES', JSON.stringify([...actualIssues, issue]));
      resolve();
    }, 1000);
  });
}

const Repo = {
  retrieveIssues,
  addIssue,
};

export default Repo;
