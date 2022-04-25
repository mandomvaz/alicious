import APIClient from '../helpers/apiclient';

async function retrieveRootIssue() {
  const response = await APIClient.post('/issue/getrootissue');

  if (response.data.success) {
    return response.data.payload;
  }

  throw new Error('Error');
}

async function addIssue(issue) {
  const response = await APIClient.post('/issue/add', issue);

  if (response.data.success) {
    return response.data.payload;
  }

  throw new Error('Error');
}

const Repo = {
  retrieveRootIssue,
  addIssue,
};

export default Repo;
