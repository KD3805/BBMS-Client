import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import DonorDashboard from './components/donor/donor-dashboard/DonorDashboard.jsx'
import DonorSignup from './components/donor/donor-auth/DonorSignup.jsx'
import DonorLogin from './components/donor/donor-auth/DonorLogin.jsx'
import RecipientDashboard from './components/recipient/recipient-dashboard/RecipientDashboard.jsx'
import RecipientSignup from './components/recipient/recipient-auth/RecipientSignup.jsx'
import RecipientLogin from './components/recipient/recipient-auth/RecipientLogin.jsx'
import AdminLogin from './components/admin/admin-auth/AdminLogin.jsx'
import AdminDashboard from './components/admin/admin-dashboard/AdminDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='/DonorSignup' element={<DonorSignup />} />
          <Route path='/RecipientSignup' element={<RecipientSignup />} />
          <Route path='/DonorLogin' element={<DonorLogin />} />
          <Route path='/RecipientLogin' element={<RecipientLogin />} />
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/DonorDashboard' element={<DonorDashboard />} />
          <Route path='/RecipientDashboard' element={<RecipientDashboard />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)

