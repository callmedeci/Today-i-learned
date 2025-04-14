import { useUser } from '@/auth/useUser';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Loading from './ui/Loading';

function ProtectedRoutes() {
  const navigate = useNavigate();
  const { isPending, user } = useUser();

  useEffect(
    function () {
      if (!user && !isPending) navigate('/login');
    },
    [navigate, user, isPending],
  );

  if (isPending) return <Loading />;

  if (user) return <Outlet />;
}

export default ProtectedRoutes;
