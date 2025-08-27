import { Outlet, type RouteObject } from "react-router-dom";
import PATHS from "./path";
import Layout from "../components/shared/layout";
import Login from "../pages/auth/login";
import Users from "../pages/dashboard/users";
import Blogs from "../pages/dashboard/blogs";
import Profile from "../pages/dashboard/profile";
import ProtectedRoute from "./protectedRoute";
import Signup from "../pages/auth/signup";

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
            path: PATHS.USERS,
            element: <Users />,
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
