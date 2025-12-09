// import { Toaster } from 'sonner';
import AppRouter from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="bottom-right" richColors />
    </>
  );
}

export default App;
