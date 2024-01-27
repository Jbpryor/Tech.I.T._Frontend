import  store  from '../../../App/store';
import { fetchIssues } from '../../Issues/issueSlice';
import { fetchProjects } from '../../Projects/projectSlice';
import { fetchReports } from '../../Reports/reportSlice';
import { fetchUsers } from '../../Users/userSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  const isUserLoggedIn = !!store.getState().auth.token;

  useEffect(() => {
    if (isUserLoggedIn) {
      store.dispatch(fetchUsers());
      store.dispatch(fetchIssues());
      store.dispatch(fetchReports());
      store.dispatch(fetchProjects());
    }
  }, [isUserLoggedIn]);

  return <Outlet />;
};

export default Prefetch;