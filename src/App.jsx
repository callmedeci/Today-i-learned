import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CheckCircle2, XCircle } from 'lucide-react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './components/ui/Layout';

import CheckLoggedInUser from './components/CheckLoggedInUser';
import ProtectedRoutes from './components/ProtectedRoutes';

const CreateAccount = lazy(() => import('./pages/CreateAccount'));
const Login = lazy(() => import('./pages/Login'));
const Homepage = lazy(() => import('./pages/Homepage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

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
    </QueryClientProvider>
  );
}

export default App;
