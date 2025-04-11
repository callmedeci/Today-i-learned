import { CheckCircle2, XCircle } from 'lucide-react';
import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router';

const Homepage = lazy(() => import('./pages/Homepage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <Toaster
        containerClassName='m-2'
        position='top-center'
        gutter={12}
        toastOptions={{
          style: {
            backgroundColor: 'var(--color-neutral-700)',
            color: 'var(--color-neutral-300)',
            fontSize: 'var(--text-lg)',
            fontWeight: '600',
            boxShadow: 'var(--shadow-md)',
            zIndex: '50',
          },

          success: {
            icon: <CheckCircle2 className='size-7 text-green-500' />,
            duration: 3000,
          },
          error: {
            icon: <XCircle className='size-7 text-rose-500' />,
            duration: 5000,
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route element={<Homepage />} index />

          <Route element={<NotFound />} path='*' />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
