import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentOfPost, initState } from '../../stores/postSlice';

function ListComment() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.post);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCommentOfPost(id));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(initState());
    }
  }, []);

  return (
    <div>
      <h3>List Comment</h3>
      <div>
        {state.isFetching && <p>Loading...</p>}
        {state.comments && state.comments.length > 0 && state.comments.map((comment) => (
          <div key={comment.id}>
            <p><pre>{JSON.stringify(comment)}</pre></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListComment