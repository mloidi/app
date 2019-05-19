export const GET = 'GET';
export const POST = 'POST';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

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
  getUsers: token => {
    const url = process.env.REACT_APP_BACKEND_URL + '/user/all';
    const requestOptions = setRequestOptions({
      method: GET,
      token
    });
    const req = new Request(url, requestOptions);
    return fetch(req).then(response => {
      if (!statusOK(response.status)) {
        throw response.json();
      }
      return response.json();
    });
  }
};
