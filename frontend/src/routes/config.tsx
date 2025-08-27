import { Outlet, type RouteObject } from "react-router-dom";
import PATHS from "./path";
import Signup from "../components/auth/signup";
import Layout from "../components/shared/layout";
import Login from "../pages/auth/login";
import Users from "../pages/dashboard/users";
import Blogs from "../pages/dashboard/blogs";
import Profile from "../pages/dashboard/profile";
import ProtectedRoute from "./protectedRoute";

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
    // children: [
    //   {
    //     path: Path.ROOT, // Adjust this path if necessary
    //     element: (
    //       <MainLayout>
    //         <Container component="main" maxWidth="xl">
    //           <Outlet />
    //         </Container>
    //       </MainLayout>
    //     )
    // children: [
    //   {
    //     path: PATHS.AUTH, // Adjust this path if necessary
    //     element: (
    //       <MainLayout>
    //         <Container component="main" maxWidth="xl">
    //           <Outlet />
    //         </Container>
    //       </MainLayout>
    //     ),
    //     children: [
    //       {
    //         path: Path.CONNECTIONS,
    //         element: <ProtectedRoute element={<Connections />} />,
    //       },
    //       {
    //         path: Path.INTEGRATIONS,
    //         element: (
    //           <ProtectedRoute
    //             element={
    //               <Suspense fallback={<LoadingComponent />}>
    //                 <Integrations />
    //               </Suspense>
    //             }
    //           />
    //         ),
    //       },
    //       {
    //         path: Path.BIG_QUERY,
    //         element: <ProtectedRoute element={<BigQueryForm />} />,
    //       },
    //       {
    //         path: Path.ONBOARDING_BOARD_BIG_QUERY_SETTINGS,
    //         element: <ProtectedRoute element={<BoardBigQuerySettingsForm />} />,
    //       },
    //       {
    //         path: Path.LOGIN,
    //         element: <PublicRoute element={<Login />} />,
    //       },
    //       {
    //         path: Path.SIGNUP,
    //         element: <PublicRoute element={<Signup />} />,
    //       },
    //       {
    //         path: Path.MONDAY_OAUTH_CALLBACK,
    //         element: <RedirectionRoute element={<MondayOauthCallback />} />,
    //       },
    //       {
    //         path: Path.BIGQUERY_OAUTH_CALLBACK,
    //         element: <RedirectionRoute element={<BigQueryOauthCallback />} />,
    //       },
    //       {
    //         path: Path.BOARD_COUNT_LIMIT_REACHED,
    //         element: <ProtectedRoute element={<BoardCountLimitReached />} />,
    //       },
    //       {
    //         path: Path.SETTINGS,
    //         element: <ProtectedRoute element={<Settings />} />,
    //       },
    //       {
    //         path: Path.ONBOARDING_MONDAY_TO_BIGQUERY_LINK_TO_DOCS,
    //         element: (
    //           <ProtectedRoute
    //             element={<MondayToBigQueryOnboardingLinkToDocs />}
    //           />
    //         ),
    //       },
    //     ],
    //   }]
  },
];
