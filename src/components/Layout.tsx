import { NavLink, Outlet } from 'react-router'
import { FaBars, FaPhoneVolume, FaSeedling, FaXmark } from 'react-icons/fa6'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Equipment' },
  { to: '/service', label: 'Service' },
  { to: '/delivery', label: 'Delivery' },
  { to: '/warranty', label: 'Warranty' },
  { to: '/contacts', label: 'Contacts' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3.5 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-emerald-950 text-white shadow-sm' : 'text-stone-700 hover:bg-white hover:text-emerald-950'
  }`

const Layout = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen text-stone-900">
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 shadow-[0_10px_30px_rgba(28,25,23,0.06)] backdrop-blur-xl">
        <div className="border-b border-stone-800 bg-stone-950">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs font-semibold sm:px-6 lg:px-8">
            <span className="text-stone-300">Independent agricultural equipment dealer</span>
            <span className="hidden text-stone-300 sm:inline">Mon-Fri 8:00-17:30 / Grand Island, NE</span>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-900 bg-gradient-to-br from-emerald-950 to-emerald-800 text-white shadow-[0_14px_32px_rgba(6,78,59,0.28)]">
              <FaSeedling className="text-xl" />
            </span>
            <span>
              <span className="block text-xl font-extrabold leading-5 text-stone-950">AgroPrime Equipment</span>
              <span className="block text-xs font-bold uppercase tracking-[0.2em] text-emerald-900">Sales / Service / Delivery</span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <a href="tel:+15550198400" className="premium-button hidden items-center gap-2 text-sm md:flex">
            <FaPhoneVolume /> (555) 019-8400
          </a>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-stone-300 bg-white text-stone-800 shadow-sm lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
        {open && (
          <nav className="border-t border-stone-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-stone-800 bg-[linear-gradient(135deg,#0c1f17_0%,#1c1917_55%,#0f2d20_100%)] text-stone-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-extrabold text-white">AgroPrime Equipment</h2>
            <p className="mt-3 max-w-xl leading-7 text-stone-400">
              Inspected agricultural equipment, practical service support, and clear delivery coordination for established farm operations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Departments</h3>
            <div className="mt-3 grid gap-2 text-sm">
              <NavLink to="/catalog" className="hover:text-lime-300">Equipment</NavLink>
              <NavLink to="/service" className="hover:text-lime-300">Service</NavLink>
              <NavLink to="/delivery" className="hover:text-lime-300">Delivery</NavLink>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white">Contact</h3>
            <p className="mt-3 text-sm leading-6">1280 Harvest Line<br />Grand Island, NE</p>
            <p className="mt-2 text-sm font-bold text-lime-300">(555) 019-8400</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
