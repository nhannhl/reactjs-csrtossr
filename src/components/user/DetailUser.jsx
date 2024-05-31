import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailUser, initState } from '../../stores/userSlice';

function DetailUser() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetailUser(id));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(initState());
    }
  }, []);

  return (
    <div>
      <h3>Detail User</h3>
      <div>
        {state.isFetching && <p>Loading...</p>}
        {state.userDetail && <div>
          <p><pre>{JSON.stringify(state.userDetail)}</pre></p>
        </div>}
      </div>
    </div>
  )
}

export default DetailUser