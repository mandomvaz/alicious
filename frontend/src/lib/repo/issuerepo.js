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

async function deleteIssue(iid) {
  const response = await APIClient.post('/issue/delete', { iid });

  if (response.data.success) {
    return iid;
  }

  throw new Error('Error');
}

const Repo = {
  retrieveRootIssue,
  addIssue,
  deleteIssue,
};

export default Repo;
