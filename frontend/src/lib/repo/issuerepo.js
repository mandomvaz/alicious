import APIClient from '../helpers/apiclient';

async function retrieveRootIssue() {
  const response = await APIClient.post('/issue/getrootissue');

  if (response.data.success) {
    return response.data.payload;
  }

  throw new Error('Error');
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
  retrieveRootIssue,
  addIssue,
};

export default Repo;
