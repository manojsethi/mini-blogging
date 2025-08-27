import { ConfigProvider } from "antd";
import "./App.css";
import { COLORS } from "./assets/colors";
import { useRoutes } from "react-router-dom";
import { routesConfig } from "./routes/config";

function App() {
  const routes = useRoutes(routesConfig);

  return (
    <ConfigProvider
      theme={{
        token: { fontFamily: "Poppins, sans-serif" },
        components: {
          Button: {
            colorPrimary: COLORS.Primary,
            colorPrimaryHover: COLORS.Primary,
            colorPrimaryActive: COLORS.Primary,
          },
        },
      }}
    >
      {routes}
    </ConfigProvider>
  );
}

export default App;
