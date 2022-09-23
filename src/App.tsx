import PublicRoutes from "./router";

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <PublicRoutes />
    </div>
  );
};

export default App;
