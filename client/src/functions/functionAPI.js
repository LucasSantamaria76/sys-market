const baseURL = 'http://localhost:4000';

export const fetchCreate = async (endPoint, token, body) => {
  const res = await fetch(`${baseURL}${endPoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const fetchGet = async (endPoint, token) => {
  const res = await fetch(`${baseURL}${endPoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const fetchUpdate = async (endPoint, token, id, body) => {
  const res = await fetch(`${baseURL}${endPoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const fetchDelete = async (endPoint, token, id) => {
  const res = await fetch(`${baseURL}${endPoint}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
