import { Navigate, Route, Routes, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import CatalogPage from './pages/CatalogPage'
import EquipmentDetailPage from './pages/EquipmentDetailPage'
import HomePage from './pages/HomePage'
import InfoPage from './pages/InfoPage'

const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="equipment/:slug" element={<EquipmentDetailPage />} />
          <Route path="service" element={<InfoPage variant="service" />} />
          <Route path="delivery" element={<InfoPage variant="delivery" />} />
          <Route path="warranty" element={<InfoPage variant="warranty" />} />
          <Route path="contacts" element={<InfoPage variant="contacts" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
