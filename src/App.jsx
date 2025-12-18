import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <>
      <AppRouter />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            style: {
              background: '#fff',
              color: '#1f2937',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
          error: {
            style: {
              background: '#fff',
              color: '#1f2937',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
