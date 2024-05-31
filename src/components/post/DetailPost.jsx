import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailPost, initState } from '../../stores/postSlice';

function DetailPost() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.post);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetailPost(id));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(initState());
    }
  }, []);

  return (
    <div>
      <h3>Detail Post</h3>
      <div>
        {state.isFetching && <p>Loading...</p>}
        {state.postDetail && <div>
          <p><pre>{JSON.stringify(state.postDetail)}</pre></p>
        </div>}
      </div>
    </div>
  )
}

export default DetailPost