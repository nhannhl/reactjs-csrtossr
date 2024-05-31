import UserList from "../components/user/ListUser";
import DetailUser from "../components/user/DetailUser";
import ListPost from "../components/post/ListPost";
import DetailPost from "../components/post/DetailPost";
import ListComment from "../components/post/ListComment";

const routes = [
  {
    path: "/",
    component: <UserList />
  },
  {
    path: "/user",
    component: <UserList />
  },
  {
    path: "/user/:id",
    component: <DetailUser />
  },
  {
    path: "/post",
    component: <ListPost />
  },
  {
    path: "/post/:id",
    component: <DetailPost />
  },
  {
    path: "/comment/:id",
    component: <ListComment />
  },
];

export default routes;