export const register = async (body) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  const res = await fetch('http://localhost:4000/auth/register', options);
  return await res.json();
};
export const getAllUser = async () => {
  const res = await fetch('http://localhost:4000/users');
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
