const baseURL = 'http://localhost:4000';

export const createPurchase = async (body, token) => {
  const res = await fetch(`${baseURL}/purchases`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};
