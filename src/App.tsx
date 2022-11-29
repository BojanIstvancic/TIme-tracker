import { LayoutWrapper } from "./components/Layout/layoutStyled";
import GlobalStyle from "./config/style/style";
import PublicRoutes from "./router";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC<{}> = () => {
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
