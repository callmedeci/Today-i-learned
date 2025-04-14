import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { CheckCircle2, XCircle } from 'lucide-react';
import { BrowserRouter, Route, Routes } from 'react-router';

import Layout from './components/ui/Layout';

import ProtectedRoutes from './components/ProtectedRoutes';
import CheckLoggedInUser from './components/CheckLoggedInUser';

const CreateAccount = lazy(() => import('./pages/CreateAccount'));
const Login = lazy(() => import('./pages/Login'));
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
          {/* Main Layout */}
          <Route element={<Layout />}>
            {/* <Main Routes (Protected routes) */}
            <Route element={<ProtectedRoutes />}>
              <Route index element={<Homepage />} />
            </Route>

            {/* Login Routes */}
            <Route element={<CheckLoggedInUser />}>
              <Route path='login' element={<Login />} />
              <Route path='create-account' element={<CreateAccount />} />
            </Route>
          </Route>

          <Route element={<NotFound />} path='*' />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
