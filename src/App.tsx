import { AuthProvider } from "./contexts/AuthContext";
import PublicRoutes from "./router";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <AuthProvider>
        <PublicRoutes />
      </AuthProvider>
    </div>
  );
};

export default App;
