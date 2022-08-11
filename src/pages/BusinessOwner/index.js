import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../../assets/css/global.css";
import Navbar from '../../component/Navbar';
import AdminDashboard from '../../component/AdminDashboard';

const Index = () => {
  const { isAuthenticated } = useSelector(store => store.auth);
  return (
    <>
      {isAuthenticated ? (
        <div className=''>
          <Navbar />
          <div className='container'>
            <AdminDashboard />
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  )
}

export default Index;