import { Outlet, type RouteObject } from "react-router-dom";
import PATHS from "./path";
import Layout from "../components/shared/layout";
import Login from "../pages/auth/login";
import Users from "../pages/dashboard/users/index";
import Blogs from "../pages/dashboard/blogs";
import Profile from "../pages/dashboard/profile";
import ProtectedRoute from "./protectedRoute";
import Signup from "../pages/auth/signup";
import UserDetail from "../pages/dashboard/users/view";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: PATHS.AUTH.LOGIN,
        element: <ProtectedRoute requireAuth={false} children={<Login />} />,
      },
      {
        path: PATHS.AUTH.SIGNUP,
        element: <ProtectedRoute requireAuth={false} children={<Signup />} />,
      },
      {
        path: PATHS.ROOT,
        element: (
          <ProtectedRoute
            children={
              <Layout>
                <Outlet />{" "}
              </Layout>
            }
          />
        ),
        children: [
          {
            path: PATHS.USERS.ROOT,
            element: <Users />,
          },
          {
            path: PATHS.USERS.DETAIL,
            element: <UserDetail />,
          },
          {
            path: PATHS.BLOGS,
            element: <Blogs />,
          },
          {
            path: PATHS.PROFILE,
            element: <Profile />,
          },
        ],
      },
    ],
  },
];
