export const registerUserAPI = async (body) => {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, password: '123456' }),
    };
    const res = await fetch('http://localhost:4000/auth/register', options);
    return await res.json();
  } catch (error) {
    return error;
  }
};
export const getAllUserAPI = async (token) => {
  const res = await fetch('http://localhost:4000/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const deleteUserAPI = async (id, token) => {
  const res = await fetch(`http://localhost:4000/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const updateUserAPI = async (token, user) => {
  const { id, ...userData } = user;
  const res = await fetch(`http://localhost:4000/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...userData }),
  });
  return await res.json();
};

export const loginAPI = async (body) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  const res = await fetch('http://localhost:4000/auth/login', options);
  return await res.json();
};
