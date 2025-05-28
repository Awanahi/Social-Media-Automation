import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { 
  FiHome, 
  FiActivity, 
  FiBarChart2, 
  FiSettings, 
  FiMenu, 
  FiX, 
  FiLogOut,
  FiBell
} from 'react-icons/fi'
import { motion } from 'framer-motion'

const Layout = ({ logout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Instagram automation completed', time: '2 min ago' },
    { id: 2, text: 'New followers gained: +15', time: '1 hour ago' },
    { id: 3, text: 'TikTok engagement up by 23%', time: '3 hours ago' }
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }
  
  const clearNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-full gradient-bg mr-2"></div>
                <span className="text-xl font-bold bg-clip-text text-transparent gradient-bg">SocialBoost</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={toggleNotifications}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  <FiBell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-medium">Notifications</h3>
                    </div>
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map(notification => (
                          <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 flex justify-between">
                            <div>
                              <p className="text-sm font-medium">{notification.text}</p>
                              <p className="text-xs text-gray-500">{notification.time}</p>
                            </div>
                            <button 
                              onClick={() => clearNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <FiX className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No new notifications
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-primary-600"
              >
                <FiLogOut className="mr-1 h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
            
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <FiX className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FiMenu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="pt-2 pb-3 space-y-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive 
                      ? 'border-primary-500 text-primary-700 bg-primary-50' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`
                }
                onClick={closeMobileMenu}
              >
                <div className="flex items-center">
                  <FiHome className="mr-3 h-5 w-5" />
                  Dashboard
                </div>
              </NavLink>
              
              <NavLink 
                to="/automations" 
                className={({ isActive }) => 
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive 
                      ? 'border-primary-500 text-primary-700 bg-primary-50' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`
                }
                onClick={closeMobileMenu}
              >
                <div className="flex items-center">
                  <FiActivity className="mr-3 h-5 w-5" />
                  Automations
                </div>
              </NavLink>
              
              <NavLink 
                to="/analytics" 
                className={({ isActive }) => 
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive 
                      ? 'border-primary-500 text-primary-700 bg-primary-50' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`
                }
                onClick={closeMobileMenu}
              >
                <div className="flex items-center">
                  <FiBarChart2 className="mr-3 h-5 w-5" />
                  Analytics
                </div>
              </NavLink>
              
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive 
                      ? 'border-primary-500 text-primary-700 bg-primary-50' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`
                }
                onClick={closeMobileMenu}
              >
                <div className="flex items-center">
                  <FiSettings className="mr-3 h-5 w-5" />
                  Settings
                </div>
              </NavLink>
              
              <button 
                onClick={handleLogout}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                <div className="flex items-center">
                  <FiLogOut className="mr-3 h-5 w-5" />
                  Logout
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <FiHome className={`mr-3 h-5 w-5 ${
                    location.pathname === '/' ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  Dashboard
                </NavLink>
                
                <NavLink 
                  to="/automations" 
                  className={({ isActive }) => 
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <FiActivity className={`mr-3 h-5 w-5 ${
                    location.pathname === '/automations' ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  Automations
                </NavLink>
                
                <NavLink 
                  to="/analytics" 
                  className={({ isActive }) => 
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <FiBarChart2 className={`mr-3 h-5 w-5 ${
                    location.pathname === '/analytics' ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  Analytics
                </NavLink>
                
                <NavLink 
                  to="/settings" 
                  className={({ isActive }) => 
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <FiSettings className={`mr-3 h-5 w-5 ${
                    location.pathname === '/settings' ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  Settings
                </NavLink>
              </nav>
            </div>
            
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">John Doe</p>
                  <p className="text-xs font-medium text-gray-500">Pro Plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 bg-gray-50">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
