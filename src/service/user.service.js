export const GET = 'GET';
export const POST = 'POST';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

const baseURL = process.env.REACT_APP_BACKEND_URL + '/user';

export const statusOK = status => {
  console.log(status);
  if (status !== 200) return false;
  return true;
};

export const setRequestOptions = options => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (options.token) {
    headers.authorization = options.token;
  }

  const body = options.body;

  const requestOptions = {
    method: options.method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(body)
  };
  return requestOptions;
};

export const UserService = {
  getUsers: async token => {
    const url = baseURL + '/all';
    const requestOptions = setRequestOptions({
      method: GET,
      token
    });
    const req = new Request(url, requestOptions);
    const response = await fetch(req);
    return await response.json();
  },
  save: async (token, userToSave, isNew) => {
    console.log(userToSave);
    const url = baseURL + '/save/';
    const requestOptions = setRequestOptions({
      method: isNew ? POST : PATCH,
      token: token,
      body: { user: userToSave }
    });
    const req = new Request(url, requestOptions);
    const response = await fetch(req);
    return await response.json();
  },
  delete: async (token, id) => {
    const url = baseURL + '/delete/' + id;
    const requestOptions = setRequestOptions({
      method: DELETE,
      token
    });
    const req = new Request(url, requestOptions);
    const response = await fetch(req);
    return await response.json();
  }
};
