"use client"
import React, { useContext } from 'react'
import { Context } from '../layout';
import Loader from '../../components/Loader';

const page = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default page