import { Outlet } from 'react-router';

function Layout() {
  return (
    <section className='mx-auto flex min-h-dvh max-w-7xl flex-col items-center justify-center px-2 py-5'>
      <Outlet />
    </section>
  );
}

export default Layout;
