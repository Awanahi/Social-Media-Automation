import { useState } from 'react'
import { FiSave, FiUser, FiLock, FiCreditCard, FiBell, FiLink, FiInstagram, FiFacebook, FiVideo, FiPlus, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Settings = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('profile')
  
  // Profile state
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    bio: 'Digital marketing specialist with a focus on social media growth and automation.'
  })
  
  // Password state
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  
  // Subscription state
  const [subscription, setSubscription] = useState({
    plan: 'pro',
    billingCycle: 'monthly',
    nextBillingDate: '2023-08-15',
    paymentMethod: {
      type: 'card',
      last4: '4242',
      expiry: '04/25'
    }
  })
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    email: {
      automationResults: true,
      weeklyReports: true,
      tips: false
    },
    push: {
      automationResults: true,
      weeklyReports: false,
      tips: true
    }
  })
  
  // Connected accounts
  const [connectedAccounts, setConnectedAccounts] = useState([
    {
      id: 1,
      platform: 'instagram',
      username: 'johndoe_official',
      connected: true,
      status: 'active'
    },
    {
      id: 2,
      platform: 'tiktok',
      username: 'johndoe_tiktok',
      connected: true,
      status: 'active'
    },
    {
      id: 3,
      platform: 'facebook',
      username: 'John Doe',
      connected: false,
      status: 'disconnected'
    }
  ])
  
  // Modal state
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [connectPlatform, setConnectPlatform] = useState('instagram')
  
  // Handle profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value
    })
  }
  
  // Handle password form change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPassword({
      ...password,
      [name]: value
    })
  }
  
  // Handle notification toggle
  const handleNotificationToggle = (type, setting) => {
    setNotifications({
      ...notifications,
      [type]: {
        ...notifications[type],
        [setting]: !notifications[type][setting]
      }
    })
  }
  
  // Handle subscription plan change
  const handlePlanChange = (plan) => {
    setSubscription({
      ...subscription,
      plan
    })
  }
  
  // Handle billing cycle change
  const handleBillingCycleChange = (cycle) => {
    setSubscription({
      ...subscription,
      billingCycle: cycle
    })
  }
  
  // Handle connect account
  const handleConnectAccount = () => {
    // In a real app, this would initiate OAuth flow
    toast.success(`Connected to ${connectPlatform} successfully!`)
    
    // Add the new connected account
    const newAccount = {
      id: Date.now(),
      platform: connectPlatform,
      username: `johndoe_${connectPlatform}`,
      connected: true,
      status: 'active'
    }
    
    setConnectedAccounts([...connectedAccounts, newAccount])
    setShowConnectModal(false)
  }
  
  // Handle disconnect account
  const handleDisconnectAccount = (id) => {
    setConnectedAccounts(connectedAccounts.map(account => 
      account.id === id 
        ? { ...account, connected: false, status: 'disconnected' } 
        : account
    ))
    
    toast.info('Account disconnected')
  }
  
  // Handle reconnect account
  const handleReconnectAccount = (id) => {
    setConnectedAccounts(connectedAccounts.map(account => 
      account.id === id 
        ? { ...account, connected: true, status: 'active' } 
        : account
    ))
    
    toast.success('Account reconnected')
  }
  
  // Handle remove account
  const handleRemoveAccount = (id) => {
    setConnectedAccounts(connectedAccounts.filter(account => account.id !== id))
    toast.info('Account removed')
  }
  
  // Save profile
  const saveProfile = (e) => {
    e.preventDefault()
    toast.success('Profile updated successfully!')
  }
  
  // Change password
  const changePassword = (e) => {
    e.preventDefault()
    
    if (password.new !== password.confirm) {
      toast.error('New passwords do not match!')
      return
    }
    
    if (password.new.length < 8) {
      toast.error('Password must be at least 8 characters!')
      return
    }
    
    toast.success('Password changed successfully!')
    setPassword({
      current: '',
      new: '',
      confirm: ''
    })
  }
  
  // Get platform icon
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram':
        return <FiInstagram className="h-5 w-5" />
      case 'tiktok':
        return <FiVideo className="h-5 w-5" />
      case 'facebook':
        return <FiFacebook className="h-5 w-5" />
      default:
        return null
    }
  }
  
  // Get platform color class
  const getPlatformColorClass = (platform) => {
    switch (platform) {
      case 'instagram':
        return 'instagram-gradient'
      case 'tiktok':
        return 'tiktok-gradient'
      case 'facebook':
        return 'facebook-gradient'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FiUser className="mr-2 h-5 w-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`${
                activeTab === 'security'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FiLock className="mr-2 h-5 w-5" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`${
                activeTab === 'billing'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FiCreditCard className="mr-2 h-5 w-5" />
              Billing
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`${
                activeTab === 'notifications'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FiBell className="mr-2 h-5 w-5" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`${
                activeTab === 'connections'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FiLink className="mr-2 h-5 w-5" />
              Connected Accounts
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={saveProfile}>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-5">
                    <button
                      type="button"
                      className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Change
                    </button>
                    <p className="mt-1 text-xs text-gray-500">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                      Timezone
                    </label>
                    <div className="mt-1">
                      <select
                        id="timezone"
                        name="timezone"
                        value={profile.timezone}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={profile.bio}
                        onChange={handleProfileChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <FiSave className="mr-2 -ml-1 h-5 w-5" />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your password to keep your account secure.
                </p>
              </div>
              
              <form onSubmit={changePassword} className="space-y-4">
                <div>
                  <label htmlFor="current" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="current"
                      id="current"
                      value={password.current}
                      onChange={handlePasswordChange}
                      required
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="new" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="new"
                      id="new"
                      value={password.new}
                      onChange={handlePasswordChange}
                      required
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="confirm"
                      id="confirm"
                      value={password.confirm}
                      onChange={handlePasswordChange}
                      required
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Change Password
                  </button>
                </div>
              </form>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add an extra layer of security to your account.
                </p>
                
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Enable Two-Factor Authentication
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Sessions</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your active sessions.
                </p>
                
                <div className="mt-4 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Current Session</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Chrome on Windows • New York, USA • Started 2 hours ago
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Mobile App</p>
                        <p className="text-xs text-gray-500 mt-1">
                          iPhone • San Francisco, USA • Started 1 day ago
                        </p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Subscription Plan</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your subscription and billing details.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div 
                  className={`border rounded-lg p-4 ${
                    subscription.plan === 'basic' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between">
                    <h4 className="text-lg font-medium">Basic</h4>
                    {subscription.plan === 'basic' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-2xl font-bold">$9<span className="text-sm font-normal text-gray-500">/mo</span></p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      1 social media account
                    </li>
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      Basic automations
                    </li>
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      Weekly reports
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => handlePlanChange('basic')}
                    className={`mt-4 w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                      subscription.plan === 'basic'
                        ? 'border-primary-500 text-primary-700 bg-primary-50 cursor-default'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                    disabled={subscription.plan === 'basic'}
                  >
                    {subscription.plan === 'basic' ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 ${
                    subscription.plan === 'pro' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between">
                    <h4 className="text-lg font-medium">Pro</h4>
                    {subscription.plan === 'pro' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-2xl font-bold">$29<span className="text-sm font-normal text-gray-500">/mo</span></p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      5 social media accounts
                    </li>
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      Advanced automations
                    </li>
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      Daily reports
                    </li>
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => handlePlanChange('pro')}
                    className={`mt-4 w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                      subscription.plan === 'pro'
                        ? 'border-primary-500 text-primary-700 bg-primary-50 cursor-default'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                    disabled={subscription.plan === 'pro'}
                  >
                    {subscription.plan === 'pro' ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 ${
                    subscription.plan === 'business' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between">
                    <h4 className="text-lg font-medium">Business</h4>
                    {subscription.plan === 'business' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-2xl font-bold">$79<span className="text-sm font-normal text-gray-500">/mo</span></p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      Unlimited social accounts
                    </li>
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      Custom automations
                    </li>
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      Real-time analytics
                    </li>
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center text-sm">
                      <FiCheck className="mr-2 h-5 w-5 text-green-500" />
                      White-label reports
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => handlePlanChange('business')}
                    className={`mt-4 w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                      subscription.plan === 'business'
                        ? 'border-primary-500 text-primary-700 bg-primary-50 cursor-default'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                    disabled={subscription.plan === 'business'}
                  >
                    {subscription.plan === 'business' ? 'Current Plan' : 'Select Plan'}
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Billing Cycle</h3>
                
                <div className="mt-4 flex space-x-4">
                  <div 
                    className={`flex-1 border rounded-lg p-4 ${
                      subscription.billingCycle === 'monthly' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        id="monthly"
                        name="billingCycle"
                        type="radio"
                        checked={subscription.billingCycle === 'monthly'}
                        onChange={() => handleBillingCycleChange('monthly')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="monthly" className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">Monthly</span>
                      </label>
                    </div>
                  </div>
                  
                  <div 
                    className={`flex-1 border rounded-lg p-4 ${
                      subscription.billingCycle === 'annual' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        id="annual"
                        name="billingCycle"
                        type="radio"
                        checked={subscription.billingCycle === 'annual'}
                        onChange={() => handleBillingCycleChange('annual')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="annual" className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">Annual (Save 20%)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Payment Method</h3>
                
                <div className="mt-4 bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                        VISA
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Visa ending in {subscription.paymentMethod.last4}</p>
                        <p className="text-xs text-gray-500">Expires {subscription.paymentMethod.expiry}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Update
                    </button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <FiPlus className="mr-2 -ml-1 h-5 w-5" />
                    Add Payment Method
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Billing History</h3>
                
                <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Description
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Amount
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Jul 15, 2023
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Pro Plan - Monthly
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          $29.00
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-primary-600 hover:text-primary-900">
                            Download
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Jun 15, 2023
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Pro Plan - Monthly
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          $29.00
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-primary-600 hover:text-primary-900">
                            Download
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          May 15, 2023
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Pro Plan - Monthly
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          $29.00
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-primary-600 hover:text-primary-900">
                            Download
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Email Notifications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Choose what types of email notifications you'd like to receive.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Automation Results</p>
                    <p className="text-sm text-gray-500">
                      Receive a summary of your automation results.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('email', 'automationResults')}
                    className={`${
                      notifications.email.automationResults ? 'bg-primary-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    <span className="sr-only">Toggle notification</span>
                    <span
                      className={`${
                        notifications.email.automationResults ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    >
                      <span
                        className={`${
                          notifications.email.automationResults ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiX className="h-3 w-3 text-gray-400" />
                      </span>
                      <span
                        className={`${
                          notifications.email.automationResults ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiCheck className="h-3 w-3 text-primary-600" />
                      </span>
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Weekly Reports</p>
                    <p className="text-sm text-gray-500">
                      Receive a weekly summary of your social media performance.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('email', 'weeklyReports')}
                    className={`${
                      notifications.email.weeklyReports ? 'bg-primary-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    <span className="sr-only">Toggle notification</span>
                    <span
                      className={`${
                        notifications.email.weeklyReports ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    >
                      <span
                        className={`${
                          notifications.email.weeklyReports ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiX className="h-3 w-3 text-gray-400" />
                      </span>
                      <span
                        className={`${
                          notifications.email.weeklyReports ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiCheck className="h-3 w-3 text-primary-600" />
                      </span>
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tips & Recommendations</p>
                    <p className="text-sm text-gray-500">
                      Receive tips and recommendations to improve your social media strategy.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('email', 'tips')}
                    className={`${
                      notifications.email.tips ? 'bg-primary-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    <span className="sr-only">Toggle notification</span>
                    <span
                      className={`${
                        notifications.email.tips ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    >
                      <span
                        className={`${
                          notifications.email.tips ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiX className="h-3 w-3 text-gray-400" />
                      </span>
                      <span
                        className={`${
                          notifications.email.tips ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiCheck className="h-3 w-3 text-primary-600" />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Push Notifications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Choose what types of push notifications you'd like to receive.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Automation Results</p>
                    <p className="text-sm text-gray-500">
                      Receive a notification when an automation completes.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('push', 'automationResults')}
                    className={`${
                      notifications.push.automationResults ? 'bg-primary-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    <span className="sr-only">Toggle notification</span>
                    <span
                      className={`${
                        notifications.push.automationResults ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    >
                      <span
                        className={`${
                          notifications.push.automationResults ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiX className="h-3 w-3 text-gray-400" />
                      </span>
                      <span
                        className={`${
                          notifications.push.automationResults ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiCheck className="h-3 w-3 text-primary-600" />
                      </span>
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Weekly Reports</p>
                    <p className="text-sm text-gray-500">
                      Receive a notification when your weekly report is ready.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('push', 'weeklyReports')}
                    className={`${
                      notifications.push.weeklyReports ? 'bg-primary-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    <span className="sr-only">Toggle notification</span>
                    <span
                      className={`${
                        notifications.push.weeklyReports ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    >
                      <span
                        className={`${
                          notifications.push.weeklyReports ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiX className="h-3 w-3 text-gray-400" />
                      </span>
                      <span
                        className={`${
                          notifications.push.weeklyReports ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiCheck className="h-3 w-3 text-primary-600" />
                      </span>
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tips & Recommendations</p>
                    <p className="text-sm text-gray-500">
                      Receive notifications with tips and recommendations.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle('push', 'tips')}
                    className={`${
                      notifications.push.tips ? 'bg-primary-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    <span className="sr-only">Toggle notification</span>
                    <span
                      className={`${
                        notifications.push.tips ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    >
                      <span
                        className={`${
                          notifications.push.tips ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiX className="h-3 w-3 text-gray-400" />
                      </span>
                      <span
                        className={`${
                          notifications.push.tips ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                        } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                        aria-hidden="true"
                      >
                        <FiCheck className="h-3 w-3 text-primary-600" />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={() => toast.success('Notification settings saved!')}
                >
                  <FiSave className="mr-2 -ml-1 h-5 w-5" />
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {/* Connected Accounts Tab */}
          {activeTab === 'connections' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Connected Social Media Accounts</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Connect your social media accounts to enable automations.
                </p>
              </div>
              
              <div className="space-y-4">
                {connectedAccounts.map((account) => (
                  <div key={account.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${getPlatformColorClass(account.platform)}`}>
                          {getPlatformIcon(account.platform)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {account.username}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {account.connected ? (
                          <>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Connected
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDisconnectAccount(account.id)}
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              Disconnect
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Disconnected
                            </span>
                            <button
                              type="button"
                              onClick={() => handleReconnectAccount(account.id)}
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              Reconnect
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveAccount(account.id)}
                          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={() => setShowConnectModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiPlus className="mr-2 -ml-1 h-5 w-5" />
                  Connect New Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Connect Account Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Connect Social Media Account
                      </h3>
                      <div className="mt-4">
                        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                          Platform
                        </label>
                        <select
                          id="platform"
                          name="platform"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                          value={connectPlatform}
                          onChange={(e) => setConnectPlatform(e.target.value)}
                        >
                          <option value="instagram">Instagram</option>
                          <option value="tiktok">TikTok</option>
                          <option value="facebook">Facebook</option>
                          <option value="twitter">Twitter</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="pinterest">Pinterest</option>
                        </select>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">
                          You'll be redirected to {connectPlatform.charAt(0).toUpperCase() + connectPlatform.slice(1)} to authorize access to your account. We only request the permissions needed to run your automations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleConnectAccount}
                  >
                    Connect
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowConnectModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Settings
