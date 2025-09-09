import React from 'react'
import { Users, UserCheck, Activity, Award } from 'lucide-react';

export default function StatisticsCard({dashboard}) {

  const cardData = [
    {
      title: "Number of Users",
      value:dashboard?.totalusers,
      subtitle: "Active users in system",
      change: "+30 monthly",
      icon: Users,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconBg: "bg-blue-400/20",
      iconColor: "text-blue-100"
    },
   {
      title: "Number of Doctors",
      value: dashboard?.totaldoctors,
      subtitle: "Healthcare professionals",
      change: "Available now",
      icon: UserCheck,
      bgColor: "bg-green-500",
      iconBg: "bg-green-400 bg-opacity-20",
      iconColor: "text-green-100"
    },
    {
      title: "Total Steps",
      value: dashboard?.Total7steps,
      subtitle: "7-step processes",
      change: "Process workflows",
      icon: Activity,
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      iconBg: "bg-purple-400/20",
      iconColor: "text-purple-100"
    },
    {
      title: "Total QA",
      value: dashboard?.TotalQA,
      subtitle: "Quality assessments",
      change: "Monthly: 7",
      icon: Award,
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
      iconBg: "bg-orange-400/20",
      iconColor: "text-orange-100"
    }
  ];


  return (
    <div>
       <div className="">
      <div className="">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your platform metrics and performance</p>
        </div>
        
        {/* Main 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cardData.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className={`relative ${card.bgColor} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${card.iconBg} p-3 rounded-lg`}>
                    <IconComponent 
                      size={24} 
                      className={card.iconColor}
                    />
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium">Live</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-white/80 text-sm font-medium mb-1">
                    {card.title}
                  </h3>
                  <p className="text-4xl font-bold mb-1">
                    {card.value}
                  </p>
                  <p className="text-white/70 text-sm">
                    {card.subtitle}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                    {card.change}
                  </span>
                </div>
                
                {/* <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div> */}
              </div>
            );
          })}
        </div>
        
        {/* Additional Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Overview</h3>
            <p className="text-2xl font-bold text-indigo-600 mb-1">37</p>
            <p className="text-sm text-gray-600">Combined system total</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-500">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Users</h3>
            <p className="text-2xl font-bold text-cyan-600 mb-1">30</p>
            <p className="text-sm text-gray-600">Active this month</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-pink-500">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly QA</h3>
            <p className="text-2xl font-bold text-pink-600 mb-1">7</p>
            <p className="text-sm text-gray-600">Quality checks completed</p>
          </div>
        </div>
        
        {/* Quick Stats Grid */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">System Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { label: "Monthly QA", value: "7", color: "bg-red-100 text-red-600" },
              { label: "Monthly Users", value: "30", color: "bg-blue-100 text-blue-600" },
              { label: "Total 7 Steps", value: "20", color: "bg-green-100 text-green-600" },
              { label: "Total QA", value: "7", color: "bg-yellow-100 text-yellow-600" },
              { label: "Total", value: "37", color: "bg-purple-100 text-purple-600" },
              { label: "Total Doctors", value: "5", color: "bg-indigo-100 text-indigo-600" },
              { label: "Total Users", value: "31", color: "bg-pink-100 text-pink-600" }
            ].map((stat, index) => (
              <div key={index} className={`${stat.color} rounded-lg p-4 text-center`}>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
