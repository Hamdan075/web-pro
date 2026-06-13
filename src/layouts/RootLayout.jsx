import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import Navbar from '../components/Navbar'
import PageLoader from '../components/PageLoader'

const RootLayout = () => {
  return (
    <div className='school'>
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}

export default RootLayout
