import { useEffect } from 'react';
import { initState, fetchPosts } from '../../stores/postSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function ListPost() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.post);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(initState());
    }
  }, []);

  return (
    <div>
      <h3>List Post</h3>
      <div>
        {state.isFetching && <p>Loading...</p>}
        {state.posts && state.posts.length > 0 && state.posts.map((post) => (
          <div key={post.id}>
            <p>{post.title}</p>
            <button onClick={() => navigate(`/post/${post.id}`)}>Detail Post</button>
            <button onClick={() => navigate(`/comment/${post.id}`)}>Detail Comment</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListPost