const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/';

export const fetchApi = async ({ endPoint, method = 'GET', token = '', body }) => {
  const res = await fetch(`${baseURL}${endPoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body && JSON.stringify(body),
  });

  return await res.json();
};
