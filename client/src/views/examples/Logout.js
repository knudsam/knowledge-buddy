import React from 'react';
import { Button } from 'reactstrap';
import { useAuth } from '../../utils/AuthContext';
import authService from '../../utils/auth';

const Logout = () => {

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <Button color="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
