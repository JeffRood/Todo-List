import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../Presentation/Views/Login/Login';
import Task from '../../Presentation/Views/Task/Task';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AuthRoutes;
