import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const baseURL = 'http://localhost:4000';

export const useFetch = (endPoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseURL}${endPoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => (json.success ? setData(json.data) : setError(json.error)))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    isRefresh && setIsRefresh(false);
  }, [endPoint, token, isRefresh]);

  const Refresh = () => setIsRefresh(true);

  return { data, loading, error, Refresh };
};
