import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Site/Navbar'
import Footer from '../../components/Site/Footer'

export default function SiteLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}