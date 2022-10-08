import { LayoutWrapper } from "./components/layout/layoutStyled";
import GlobalStyle from "./config/style/style";
import { AuthProvider } from "./contexts/AuthContext";
import PublicRoutes from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <AuthProvider>
          <LayoutWrapper>
            <PublicRoutes />
          </LayoutWrapper>
        </AuthProvider>
      </Provider>
    </>
  );
};

export default App;
