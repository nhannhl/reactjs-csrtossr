import { useEffect } from 'react';
import { initState, setState, fetchUsers } from '../../stores/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function ListUser() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log(state);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(initState());
    }
  }, []);

  return (
    <div>
      <h3>List User</h3>
      <div>
        {state.isFetching && <p>Loading...</p>}
        {state.users && state.users.length > 0 && state.users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <button onClick={() => navigate(`/user/${user.id}`)}>Detail</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListUser