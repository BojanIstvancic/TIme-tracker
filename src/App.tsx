import GlobalStyle from "./config/style/style";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import PublicRoutes from "./router";
import { LayoutWrapper } from "./components/Layout/layoutStyled";

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
