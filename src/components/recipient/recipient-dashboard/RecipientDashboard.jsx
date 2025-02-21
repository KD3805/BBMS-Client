import React, { useEffect, useState, Suspense, lazy } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMenu, IoClose } from "react-icons/io5";
import '../../../DashboardStyle.css'
import { OutlinedButton } from '../../custom/CustomComponents';
import { useRecipientStore } from '../../../zustand/store';

// Lazy-load components
const RecipientProfile = lazy(() => import("./RecipientProfile"))
const BloodRequestForm = lazy(() => import("./BloodRequestForm"))
const RecipientRepository = lazy(() => import("./RecipientRepository"))
const ManageRecipientProfile = lazy(() => import("./ManageRecipientProfile"))

const RecipientDashboard = () => {
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const layout = querySearch.get("layout") || "0"; // Default to 0
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const [checked, setChecked] = useState(false);
  const logoutRecipient = useRecipientStore(state => state.logoutRecipient);


  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    setActiveTab(layout)
  }, [layout]);

  const menuBar = [
    {
      name: 'Recipient Dashboard',
      nav: '/RecipientDashboard/?layout=0'
    },
    {
      name: 'Request Blood',
      nav: '/RecipientDashboard/?layout=1'
    },
    {
      name: 'Recipient Repository',
      nav: '/RecipientDashboard/?layout=2'
    },
    {
      name: 'Manage Profile',
      nav: '/RecipientDashboard/?layout=3'
    }
  ]

  const renderContent = () => {
    switch (layout) {
      case "0":
        return <RecipientProfile />;
      case "1":
        return <BloodRequestForm />;
      case "2":
        return <RecipientRepository />;
      case "3":
        return <ManageRecipientProfile />
      default:
        return <RecipientProfile />;
    }
  };

  return (
    <div>
      <div className='p-10 flex justify-center items-center relative'>
        <div className='w-full'>

          <div className='flex items-center justify-between w-full border-b'>
            <div className='open-sidebar-btn mb-2 text-2xl' onClick={() => setChecked(true)}>
              <IoMenu />  
            </div>

            <h1 className='lg:text-3xl md:text-2xl text-2xl mb-3 font-semibold text-end '>{menuBar?.[activeTab]?.name}</h1>

            <div className='w-fit'>
              <OutlinedButton
                type="button"
                onClick={() => logoutRecipient()}
                text='Log out'
              />
            </div>
          </div>

          <div className='flex'>
            <div className={`w-1/6 border-r border-b links-container ${checked ? 'left-0' : 'left--300'}`}>

              <div className='close-sidebar-btn text-2xl m-5' onClick={() => setChecked(false)}>
                <IoClose />
              </div>

              {menuBar.map((item, index) => (
                <div className='border-b p-1' key={index}>
                  <p
                    className={`p-3 text-lg font-semibold cursor-pointer rounded-sm ${activeTab == index ? 'bg-pink-100 text-pink-900' : 'hover:bg-gray-100'
                      }`}
                    onClick={() => {
                      handleTabClick(index)
                      navigate(item.nav)
                      setChecked(false)
                    }}
                  >
                    {item.name}
                  </p>
                </div>
              ))}

            </div>

            <div className='w-5/6 h-[80vh] overflow-y-scroll border-b' id='dashboard-content'>
              <Suspense fallback={<div>Loading...</div>}>{renderContent()}</Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipientDashboard;
