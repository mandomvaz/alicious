import APIClient from '../helpers/apiclient';

async function retrieveRootIssue() {
  const response = await APIClient.post('/issue/getrootissue');

  if (response.data.success) {
    return response.data.payload;
  }

  throw new Error('Error');
}

async function retrieveIssue(iid) {
  const response = await APIClient.post('/issue/get', { iid });

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

async function deleteIssue({ iid, lid }) {
  const response = await APIClient.post('/issue/delete', { iid, lid });

  if (response.data.success) {
    return iid;
  }

  throw new Error('Error');
}

async function editIssue(issue) {
  const response = await APIClient.post('/issue/update', issue);

  if (response.data.success) {
    return issue;
  }

  throw new Error('Error');
}

async function editList(list) {
  const response = await APIClient.post('/list/update', list);

  if (response.data.success) {
    return list;
  }

  throw new Error('Error');
}

async function addList(list) {
  const response = await APIClient.post('/list/add', list);

  if (response.data.success) {
    return response.data.payload;
  }

  throw new Error('Error');
}

async function moveIssueTo(params) {
  const response = await APIClient.post('/list/moveto', params);

  if (response.data.success) {
    return response.data.payload;
  }

  throw new Error('Error');
}

async function moveListForward(params) {
  const response = await APIClient.post('/list/movelistforward', params);

  if (response.data.success) {
    return response.data.payload;
  }

  throw new Error('Error');
}

const Repo = {
  retrieveRootIssue,
  retrieveIssue,
  addIssue,
  deleteIssue,
  editIssue,
  editList,
  addList,
  moveIssueTo,
  moveListForward,
};

export default Repo;
