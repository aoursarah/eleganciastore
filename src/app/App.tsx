import { RouterProvider } from 'react-router';
import { Toaster } from './components/ui/sonner';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </StoreProvider>
    </AuthProvider>
  );
}
