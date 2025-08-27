import { Outlet, type RouteObject } from "react-router-dom";
import PATHS from "./path";
import Signup from "../components/auth/signup";
import Layout from "../components/shared/layout";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      { path: PATHS.AUTH.LOGIN, element: <Login /> },
      { path: PATHS.AUTH.SIGNUP, element: <Signup /> },
      {
        path: PATHS.ROOT,
        element: (
          <Layout>
            <Outlet />
          </Layout>
        ),
        children: [{
          index: true,
          element: <Dashboard />
        }]
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
