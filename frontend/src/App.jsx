import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './pages/Auth/Footer'
import './App.css'

const App = () => {
  return (
    <div className="app-container flex flex-col min-h-screen">
      <ToastContainer />
      <Navigation />
      <main className="main-content flex-grow py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
