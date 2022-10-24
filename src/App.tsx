import { LayoutWrapper } from "./components/layout/layoutStyled";
import GlobalStyle from "./config/style/style";
import PublicRoutes from "./router";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <LayoutWrapper>
            <PublicRoutes />
          </LayoutWrapper>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
