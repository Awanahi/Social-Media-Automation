import { useState } from 'react'
import { FiInstagram, FiFacebook, FiVideo, FiCalendar, FiDownload, FiFilter, FiUsers, FiHeart, FiMessageSquare, FiEye } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7days')
  const [platform, setPlatform] = useState('all')
  const [metric, setMetric] = useState('followers')
  
  // Date labels based on selected range
  const getDateLabels = () => {
    const today = new Date()
    const labels = []
    
    if (dateRange === '7days') {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
      }
    } else if (dateRange === '30days') {
      for (let i = 0; i < 5; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - (i * 7))
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
      }
      labels.reverse()
    } else if (dateRange === '90days') {
      for (let i = 0; i < 3; i++) {
        const date = new Date(today)
        date.setMonth(today.getMonth() - i)
        labels.push(date.toLocaleDateString('en-US', { month: 'short' }))
      }
      labels.reverse()
    }
    
    return labels
  }
  
  // Generate random data for charts
  const generateData = (min, max, count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min))
  }
  
  // Follower growth data
  const followerGrowthData = {
    labels: getDateLabels(),
    datasets: [
      {
        label: 'Instagram',
        data: platform === 'all' || platform === 'instagram' 
          ? generateData(10, 50, dateRange === '7days' ? 7 : dateRange === '30days' ? 5 : 3) 
          : [],
        borderColor: '#E1306C',
        backgroundColor: 'rgba(225, 48, 108, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'TikTok',
        data: platform === 'all' || platform === 'tiktok' 
          ? generateData(20, 80, dateRange === '7days' ? 7 : dateRange === '30days' ? 5 : 3) 
          : [],
        borderColor: '#000000',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Facebook',
        data: platform === 'all' || platform === 'facebook' 
          ? generateData(5, 30, dateRange === '7days' ? 7 : dateRange === '30days' ? 5 : 3) 
          : [],
        borderColor: '#4267B2',
        backgroundColor: 'rgba(66, 103, 178, 0.1)',
        tension: 0.4,
        fill: true
      }
    ].filter(dataset => dataset.data.length > 0)
  }
  
  // Engagement data
  const engagementData = {
    labels: getDateLabels(),
    datasets: [
      {
        label: 'Instagram',
        data: platform === 'all' || platform === 'instagram' 
          ? generateData(100, 500, dateRange === '7days' ? 7 : dateRange === '30days' ? 5 : 3) 
          : [],
        borderColor: '#E1306C',
        backgroundColor: '#E1306C',
      },
      {
        label: 'TikTok',
        data: platform === 'all' || platform === 'tiktok' 
          ? generateData(200, 800, dateRange === '7days' ? 7 : dateRange === '30days' ? 5 : 3) 
          : [],
        borderColor: '#000000',
        backgroundColor: '#000000',
      },
      {
        label: 'Facebook',
        data: platform === 'all' || platform === 'facebook' 
          ? generateData(50, 300, dateRange === '7days' ? 7 : dateRange === '30days' ? 5 : 3) 
          : [],
        borderColor: '#4267B2',
        backgroundColor: '#4267B2',
      }
    ].filter(dataset => dataset.data.length > 0)
  }
  
  // Platform distribution data
  const platformDistributionData = {
    labels: ['Instagram', 'TikTok', 'Facebook'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ['#E1306C', '#000000', '#4267B2'],
        borderWidth: 0,
      }
    ]
  }
  
  // Automation performance data
  const automationPerformanceData = {
    labels: ['Follow/Unfollow', 'Content Liker', 'Comment Engagement', 'Group Networker'],
    datasets: [
      {
        label: 'Success Rate',
        data: [87, 92, 78, 85],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
      {
        label: 'Engagement Rate',
        data: [65, 72, 58, 63],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      }
    ]
  }
  
  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }
  
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    }
  }
  
  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
    cutout: '70%'
  }
  
  // Key metrics data
  const keyMetrics = [
    {
      title: 'Total Followers',
      value: '8,742',
      change: '+12.5%',
      icon: <FiUsers />,
      positive: true
    },
    {
      title: 'Engagement Rate',
      value: '5.8%',
      change: '+2.3%',
      icon: <FiHeart />,
      positive: true
    },
    {
      title: 'Comments',
      value: '1,254',
      change: '+18.7%',
      icon: <FiMessageSquare />,
      positive: true
    },
    {
      title: 'Impressions',
      value: '45.2K',
      change: '-3.1%',
      icon: <FiEye />,
      positive: false
    }
  ]
  
  // Handle date range change
  const handleDateRangeChange = (range) => {
    setDateRange(range)
  }
  
  // Handle platform filter change
  const handlePlatformChange = (plat) => {
    setPlatform(plat)
  }
  
  // Handle metric change
  const handleMetricChange = (met) => {
    setMetric(met)
  }
  
  // Get chart based on selected metric
  const getMetricChart = () => {
    switch(metric) {
      case 'followers':
        return <Line options={lineChartOptions} data={followerGrowthData} height={80} />
      case 'engagement':
        return <Bar options={barChartOptions} data={engagementData} height={80} />
      default:
        return <Line options={lineChartOptions} data={followerGrowthData} height={80} />
    }
  }

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and analyze your social media performance
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FiCalendar className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Custom Date Range
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FiDownload className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Export Report
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="dashboard-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                metric.positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {metric.icon}
              </div>
            </div>
            <div className="mt-4">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                metric.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {metric.change}
              </span>
              <span className="text-xs text-gray-500 ml-2">vs. previous period</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FiCalendar className="mr-2 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 mr-2">Period:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDateRangeChange('7days')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dateRange === '7days' 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => handleDateRangeChange('30days')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dateRange === '30days' 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  30 Days
                </button>
                <button
                  onClick={() => handleDateRangeChange('90days')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dateRange === '90days' 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  90 Days
                </button>
              </div>
            </div>

            <div className="flex items-center ml-4">
              <FiFilter className="mr-2 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 mr-2">Platform:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePlatformChange('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    platform === 'all' 
                      ? 'bg-gray-200 text-gray-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handlePlatformChange('instagram')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    platform === 'instagram' 
                      ? 'bg-pink-100 text-pink-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-pink-50'
                  }`}
                >
                  Instagram
                </button>
                <button
                  onClick={() => handlePlatformChange('tiktok')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    platform === 'tiktok' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  TikTok
                </button>
                <button
                  onClick={() => handlePlatformChange('facebook')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    platform === 'facebook' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  Facebook
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex space-x-2">
              <button
                onClick={() => handleMetricChange('followers')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  metric === 'followers' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Followers
              </button>
              <button
                onClick={() => handleMetricChange('engagement')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  metric === 'engagement' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Engagement
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Chart */}
      <div className="dashboard-card mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {metric === 'followers' ? 'Follower Growth' : 'Engagement Metrics'}
        </h3>
        <div className="h-80">
          {getMetricChart()}
        </div>
      </div>
      
      {/* Platform Distribution & Automation Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Platform Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full max-w-xs">
              <Doughnut options={doughnutChartOptions} data={platformDistributionData} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 rounded-full instagram-gradient flex items-center justify-center">
                  <FiInstagram className="text-white h-4 w-4" />
                </div>
              </div>
              <p className="text-sm font-medium mt-1">Instagram</p>
              <p className="text-lg font-bold">45%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 rounded-full tiktok-gradient flex items-center justify-center">
                  <FiVideo className="text-white h-4 w-4" />
                </div>
              </div>
              <p className="text-sm font-medium mt-1">TikTok</p>
              <p className="text-lg font-bold">35%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 rounded-full facebook-gradient flex items-center justify-center">
                  <FiFacebook className="text-white h-4 w-4" />
                </div>
              </div>
              <p className="text-sm font-medium mt-1">Facebook</p>
              <p className="text-lg font-bold">20%</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Automation Performance</h3>
          <div className="h-64">
            <Bar options={barChartOptions} data={automationPerformanceData} />
          </div>
          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="flex items-center">
              <span className="h-3 w-3 bg-emerald-500 rounded-full mr-2"></span>
              <span>Success Rate</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 bg-blue-500 rounded-full mr-2"></span>
              <span>Engagement Rate</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Performing Content */}
      <div className="dashboard-card mb-8">
        <h3 className="text-lg font-semibold mb-4">Top Performing Content</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Likes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comments
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shares
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-gray-200 flex-shrink-0"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Travel Photography Tips</div>
                      <div className="text-sm text-gray-500">Posted 3 days ago</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="platform-badge platform-badge-instagram">Instagram</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1,245
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  87
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  156
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    8.7%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-gray-200 flex-shrink-0"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Dance Tutorial #45</div>
                      <div className="text-sm text-gray-500">Posted 5 days ago</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="platform-badge platform-badge-tiktok">TikTok</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  3,782
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  245
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  892
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    12.3%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-gray-200 flex-shrink-0"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Business Growth Strategies</div>
                      <div className="text-sm text-gray-500">Posted 1 week ago</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="platform-badge platform-badge-facebook">Facebook</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  578
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  124
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  67
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    5.9%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-gray-200 flex-shrink-0"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Fitness Challenge Day 3</div>
                      <div className="text-sm text-gray-500">Posted 2 days ago</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="platform-badge platform-badge-instagram">Instagram</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  987
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  76
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  112
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    7.2%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All Content
          </button>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="dashboard-card">
        <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiInstagram className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 font-medium">Instagram Recommendation</p>
                <p className="text-sm text-blue-600 mt-1">
                  Your engagement rate is 18% higher when posting between 6-8 PM. Consider scheduling more content during this time.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiVideo className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700 font-medium">TikTok Recommendation</p>
                <p className="text-sm text-green-600 mt-1">
                  Videos with hashtags #dance and #tutorial are performing 32% better than your other content. Consider creating more content with these themes.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiFacebook className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 font-medium">Facebook Recommendation</p>
                <p className="text-sm text-yellow-600 mt-1">
                  Your Facebook engagement has decreased by 5% in the last week. Consider increasing your posting frequency or adjusting your content strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
