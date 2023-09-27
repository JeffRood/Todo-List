import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Task from '../../Presentation/Views/Task/Task';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Task />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
