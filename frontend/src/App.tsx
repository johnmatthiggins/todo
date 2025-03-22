import Home from './Home.tsx';
import { AuthProvider } from './AuthContext.tsx';

function App() {
  return (
      <AuthProvider>
        <Home />
      </AuthProvider>
  );
}

export default App;
