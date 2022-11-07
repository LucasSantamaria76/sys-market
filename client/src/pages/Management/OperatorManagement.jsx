import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUser } from '../../functions/functionsUser';
import { setUsers } from '../../redux/slices/usersSlice';

export const OperatorManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAndSetUsers = async () => {
      try {
        const res = await getAllUser();
        res?.length && dispatch(setUsers(res));
      } catch (error) {
        console.log(error);
      }
    };
    getAndSetUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>OperatorManagement</div>;
};
