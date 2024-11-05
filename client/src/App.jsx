import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import Dashboard from './components/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Modal from './notifications/Modal.jsx'
import Github from './components/Github.jsx'
import ProtectedRoutes from './components/routes/ProtectedRoutes.jsx'
import ForgetPassword from './components/password/ForgetPassword.jsx'
import { Music1 } from './components/Music.jsx'

function App() {
  const [show, setShow] = useState(false)
  const closeModal = () => setShow(false)
  // const openModal = () => setShow(true)
  useEffect(() => {
    setShow(true)
    return () => setInterval(closeModal, 4000)
  }, [])

  return (
    <div className='app-compo'>
      <Navbar />
      {/* <Music1 /> */}
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/github'
          element={<Github />}
        />
        <Route path='login' element={<Login />}>
          <Route path='forget' element={<ForgetPassword />} />
        </Route>
        <Route
          path='/users/register'
          element={<SignUp />}
        />

        <Route
          path="/protected"
          element={
            <ProtectedRoutes>
              <Github />
            </ProtectedRoutes>
          }
        />
      </Routes>

      <Modal isOpen={show} closeModal={closeModal}>
        <div className='font-semibold'>Hii There You're welcome to Music App</div>
      </Modal>

      <Footer />
    </div>
  )
}

export default App;
