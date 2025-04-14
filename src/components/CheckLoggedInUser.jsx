import { useUser } from '@/auth/useUser';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import Loading from './ui/Loading';

function CheckLoggedInUser() {
  const navigate = useNavigate();
  const { isPending, user } = useUser();

  useEffect(
    function () {
      if (user) navigate('/');
    },
    [navigate, user],
  );

  if (isPending) return <Loading />;

  if (!user) return <Outlet />;
}

export default CheckLoggedInUser;
