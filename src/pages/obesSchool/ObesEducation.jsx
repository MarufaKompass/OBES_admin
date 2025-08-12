import { adminProfile, educationList } from '@/hooks/ReactQueryHooks';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Users, Baby, Globe } from "lucide-react";
export default function ObesEducation() {
  const [activeTab, setActiveTab] = useState("adult");



    const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });


const { data: eduList, isLoading } = useQuery({
  queryKey: ['eduList', profile?.role],
  queryFn: () => educationList(profile?.role)
});
console.log("eduList", eduList);



  const getFilteredModules = (category) => {
    return eduList?.filter(
      (module) => module?.category.toLowerCase() === category?.toLowerCase()
    );
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case "adult":
        return <Users className="w-4 h-4" />;
      case "children":
        return <Baby className="w-4 h-4" />;
      case "both":
        return <Globe className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const tabs = [
    { value: "adult", label: "Adult", color: "bg-blue-500" },
    { value: "children", label: "Children", color: "bg-green-500" },
    { value: "both", label: "All Ages", color: "bg-purple-500" },
  ];



    



  return (
      <div className="max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="grid grid-cols-3 w-full mb-8 bg-white shadow-sm rounded-lg overflow-hidden">
        {eduList?.category?.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? `${tab.color} text-white`
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {getTabIcon(tab.value)}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getFilteredModules(activeTab)?.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ module }) {
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "adult":
        return "bg-blue-100 text-blue-800";
      case "children":
        return "bg-green-100 text-green-800";
      case "both":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatModuleInfo = (info) => {
    return info.split(/\r?\n/).map((line, index) => (
      <div key={index} className="mb-1 text-sm text-gray-600">
        {line}
      </div>
    ));
  };

  return (
    <div className="hover:shadow-lg transition-shadow duration-200 bg-white rounded-lg overflow-hidden border">
      {/* Card Header */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-2">
          <span
            className={`px-2 py-0.5 text-xs rounded-full font-medium ${getCategoryColor(
              module.category
            )}`}
          >
            {module.category}
          </span>
          <span className="px-2 py-0.5 text-xs border rounded-full text-gray-600">
            {module.modnum}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{module.topic}</h3>
        <p className="text-sm text-gray-500">{module.modtype} Module</p>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="mb-4">
          <img
            src={
              module.mimage ||
              "/placeholder.svg?height=200&width=300&query=health education"
            }
            alt={`${module.topic} module illustration`}
            className="w-full h-48 object-cover rounded-lg bg-gray-100"
            onError={(e) => {
              e.target.src = "/health-education.png";
            }}
          />
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800 mb-2">Module Content:</h4>
          <div className="text-sm text-gray-600 leading-relaxed">
            {formatModuleInfo(module.modinfo)}
          </div>
        </div>
      </div>
    </div>
  )
}
