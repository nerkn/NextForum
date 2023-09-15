'use client';

import { authStore } from '@/lib/context/auth';
import React, { useState, useEffect } from 'react';


export default function UserOnly({ children  }:{
    children :React.ReactNode
})  {
  const [hasMounted, setHasMounted] = useState(false); 
  const {login,  user } = authStore(s=>({login:s.login, user:s.user}))

  useEffect(() => {
      setHasMounted(true);
  }, [])

  if (!hasMounted) 
    return null;

  if(!login)
    return null

  return  children
};
 