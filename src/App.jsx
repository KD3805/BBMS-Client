import React, { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useAdminStore, useDonorStore, useRecipientStore } from './zustand/store';

const App = () => {
  const initializeDonor = useDonorStore((state) => state.initializeDonor);
  const initializeRecipient = useRecipientStore((state) => state.initializeRecipient);
  const initializeAdmin = useAdminStore((state) => state.initializeAdmin);

  useEffect(() => {
    initializeDonor();
    initializeRecipient();
    initializeAdmin();
  }, []);


  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
