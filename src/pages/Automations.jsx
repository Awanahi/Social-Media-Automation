import React, { useState } from 'react'
import { FiPlus, FiMoreVertical, FiPlay, FiPause, FiEdit2, FiTrash2, FiClock, FiRepeat, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'

const Automations = () => {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: 'Instagram Follow/Unfollow',
      platform: 'Instagram',
      status: 'active',
      schedule: 'Daily at 10:00 AM',
      lastRun: '2 hours ago',
      nextRun: 'Tomorrow at 10:00 AM',
      description: 'Automatically follows targeted accounts and unfollows non-followers after 3 days',
      stats: {
        followsToday: 28,
        unfollowsToday: 15,
        totalFollowed: 1243,
        totalUnfollowed: 876
      }
    },
    {
      id: 2,
      name: 'Twitter Engagement',
      platform: 'Twitter',
      status: 'active',
      schedule: 'Every 2 hours',
      lastRun: '35 minutes ago',
      nextRun: 'In 1 hour 25 minutes',
      description: 'Likes and retweets content from specified hashtags and accounts',
      stats: {
        likesToday: 42,
        retweetsToday: 12,
        totalLikes: 2156,
        totalRetweets: 543
      }
    },
    {
      id: 3,
      name: 'LinkedIn Connection Requests',
      platform: 'LinkedIn',
      status: 'paused',
      schedule: 'Weekdays at 9:00 AM',
      lastRun: '2 days ago',
      nextRun: 'Paused',
      description: 'Sends personalized connection requests to people in your target industry',
      stats: {
        requestsToday: 0,
        acceptedToday: 3,
        totalRequests: 450,
        totalAccepted: 312
      }
    },
    {
      id: 4,
      name: 'TikTok Comment Responder',
      platform: 'TikTok',
      status: 'active',
      schedule: 'Every hour',
      lastRun: '48 minutes ago',
      nextRun: 'In 12 minutes',
      description: 'Automatically responds to comments on your TikTok videos using AI',
      stats: {
        responsesToday: 17,
        engagementRate: '24%',
        totalResponses: 876,
        avgResponseTime: '3 min'
      }
    },
    {
      id: 5,
      name: 'Content Scheduler',
      platform: 'Multiple',
      status: 'active',
      schedule: 'Custom schedule',
      lastRun: '6 hours ago',
      nextRun: 'Today at 6:00 PM',
      description: 'Posts pre-planned content across multiple platforms based on your content calendar',
      stats: {
        postsToday: 3,
        scheduledNext: 5,
        totalPosts: 127,
        engagementAvg: '18%'
      }
    }
  ])
  
  const [showDropdown, setShowDropdown] = useState(null)
  const [showNewAutomationModal, setShowNewAutomationModal] = useState(false)
  const [newAutomation, setNewAutomation] = useState({
    name: '',
    platform: 'Instagram',
    description: '',
    schedule: 'Daily'
  })
  
  const toggleDropdown = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null)
    } else {
      setShowDropdown(id)
    }
  }
  
  const toggleAutomationStatus = (id) => {
    setAutomations(automations.map(automation => {
      if (automation.id === id) {
        const newStatus = automation.status === 'active' ? 'paused' : 'active'
        return {
          ...automation,
          status: newStatus,
          nextRun: newStatus === 'paused' ? 'Paused' : automation.nextRun
        }
      }
      return automation
    }))
    setShowDropdown(null)
  }
  
  const deleteAutomation = (id) => {
    setAutomations(automations.filter(automation => automation.id !== id))
    setShowDropdown(null)
  }
  
  const handleNewAutomationSubmit = (e) => {
    e.preventDefault()
    
    const newId = Math.max(...automations.map(a => a.id)) + 1
    
    setAutomations([
      ...automations,
      {
        id: newId,
        name: newAutomation.name,
        platform: newAutomation.platform,
        status: 'active',
        schedule: `${newAutomation.schedule}`,
        lastRun: 'Never',
        nextRun: 'Today at 3:00 PM',
        description: newAutomation.description,
        stats: {
          actionsToday: 0,
          totalActions: 0
        }
      }
    ])
    
    setNewAutomation({
      name: '',
      platform: 'Instagram',
      description: '',
      schedule: 'Daily'
    })
    
    setShowNewAutomationModal(false)
  }
  
  const getPlatformColor = (platform) => {
    switch(platform) {
      case 'Instagram':
        return 'from-pink-500 via-red-500 to-yellow-500'
      case 'Twitter':
        return 'bg-blue-500'
      case 'LinkedIn':
        return 'bg-blue-700'
      case 'TikTok':
        return 'bg-black'
      case 'Multiple':
        return 'from-purple-500 to-indigo-600'
      default:
        return 'bg-gray-500'
    }
  }
  
  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'Instagram':
        return (
          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        )
      case 'Twitter':
        return (
          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        )
      case 'LinkedIn':
        return (
          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        )
      case 'TikTok':
        return (
          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        )
      case 'Multiple':
        return (
          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        )
      default:
        return <FiMoreVertical className="h-5 w-5 text-white" />
    }
  }
  
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Automations
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your social media automation workflows
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => setShowNewAutomationModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FiPlus className="-ml-1 mr-2 h-5 w-5" />
            New Automation
          </button>
        </div>
      </div>
      
      {/* Automation cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {automations.map((automation, index) => (
          <motion.div
            key={automation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full ${
                    automation.platform === 'Instagram' || automation.platform === 'Multiple'
                      ? `bg-gradient-to-r ${getPlatformColor(automation.platform)}`
                      : getPlatformColor(automation.platform)
                  } flex items-center justify-center`}>
                    {getPlatformIcon(automation.platform)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {automation.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {automation.platform}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(automation.id)}
                    className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                  >
                    <FiMoreVertical className="h-5 w-5 text-gray-400" />
                  </button>
                  
                  {showDropdown === automation.id && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                          onClick={() => toggleAutomationStatus(automation.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          role="menuitem"
                        >
                          {automation.status === 'active' ? (
                            <>
                              <FiPause className="mr-3 h-5 w-5 text-gray-400" />
                              Pause
                            </>
                          ) : (
                            <>
                              <FiPlay className="mr-3 h-5 w-5 text-gray-400" />
                              Resume
                            </>
                          )}
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          role="menuitem"
                        >
                          <FiEdit2 className="mr-3 h-5 w-5 text-gray-400" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAutomation(automation.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                          role="menuitem"
                        >
                          <FiTrash2 className="mr-3 h-5 w-5 text-red-500" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {automation.description}
                </p>
              </div>
              
              <div className="mt-5 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiClock className="mr-1.5 h-4 w-4 text-gray-400" />
                    <span>Last run: {automation.lastRun}</span>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      automation.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {automation.status === 'active' ? (
                        <FiCheckCircle className="-ml-0.5 mr-1.5 h-3 w-3 text-green-500" />
                      ) : (
                        <FiAlertCircle className="-ml-0.5 mr-1.5 h-3 w-3 text-yellow-500" />
                      )}
                      {automation.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <FiRepeat className="mr-1.5 h-4 w-4 text-gray-400" />
                  <span>Schedule: {automation.schedule}</span>
                </div>
                
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <FiClock className="mr-1.5 h-4 w-4 text-gray-400" />
                  <span>Next run: {automation.nextRun}</span>
                </div>
              </div>
              
              <div className="mt-5 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(automation.stats).map(([key, value], i) => (
                    <div key={i} className="bg-gray-50 rounded p-2">
                      <p className="text-xs text-gray-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="flex justify-between">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  View logs
                </button>
                
                <button
                  type="button"
                  onClick={() => toggleAutomationStatus(automation.id)}
                  className={`inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white ${
                    automation.status === 'active'
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : 'bg-green-600 hover:bg-green-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    automation.status === 'active'
                      ? 'focus:ring-yellow-500'
                      : 'focus:ring-green-500'
                  }`}
                >
                  {automation.status === 'active' ? (
                    <>
                      <FiPause className="-ml-0.5 mr-1 h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <FiPlay className="-ml-0.5 mr-1 h-4 w-4" />
                      Resume
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* New Automation Modal */}
      {showNewAutomationModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Create New Automation
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Set up a new automation workflow for your social media accounts.
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleNewAutomationSubmit} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Automation Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={newAutomation.name}
                      onChange={(e) => setNewAutomation({...newAutomation, name: e.target.value})}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="e.g., Instagram Engagement"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                    Platform
                  </label>
                  <div className="mt-1">
                    <select
                      id="platform"
                      name="platform"
                      value={newAutomation.platform}
                      onChange={(e) => setNewAutomation({...newAutomation, platform: e.target.value})}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option>Instagram</option>
                      <option>Twitter</option>
                      <option>LinkedIn</option>
                      <option>TikTok</option>
                      <option>Multiple</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={newAutomation.description}
                      onChange={(e) => setNewAutomation({...newAutomation, description: e.target.value})}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe what this automation will do"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                    Schedule
                  </label>
                  <div className="mt-1">
                    <select
                      id="schedule"
                      name="schedule"
                      value={newAutomation.schedule}
                      onChange={(e) => setNewAutomation({...newAutomation, schedule: e.target.value})}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option>Daily</option>
                      <option>Every 2 hours</option>
                      <option>Hourly</option>
                      <option>Weekly</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewAutomationModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Automations
