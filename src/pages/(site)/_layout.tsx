import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Site/Navbar'
import Footer from '../../components/Site/Footer'

export default function SiteLayout() {
  return (
    <div>
      <div className='sticky top-0 z-[9999]'><Navbar /></div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}