import GlobalStyle from "./config/style/style";
import { AuthProvider } from "./contexts/AuthContext";
import PublicRoutes from "./router";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <PublicRoutes />
      </AuthProvider>
    </>
  );
};

export default App;
