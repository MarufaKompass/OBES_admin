import { adminProfile, educationList } from '@/hooks/ReactQueryHooks';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Users, Baby, Globe } from "lucide-react";
import ModuleCard from './ModuleCard';
export default function ObesEducation() {
  const [activeTab, setActiveTab] = useState("adult")
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });
  const { data: eduList, isLoading } = useQuery({
    queryKey: ['eduList', profile?.role],
    queryFn: () => educationList(profile?.role)
  });
  console.log("eduList", eduList)
  const getFilteredModules = (category) =>
    eduList?.filter((module) => {
      const cat = module.category.toLowerCase();
      if (category === "adult") {
        return cat === "adult" || cat === "both"
      }
      if (category === "child") {
        return cat === "child" || cat === "both"
      }
      return cat === "both"
    }



    );


  const getTabIcon = (tab) => {
    switch (tab) {
      case "adult":
        return <Users className="w-4 h-4" />;
      case "child":
        return <Baby className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const tabs = [
    { key: "adult", label: "Adult", color: "blue" },
    { key: "child", label: "Child", color: "green" },
  ];

  return (
    <div className="mx-auto p-4">
      {/* Tabs */}
      <div className="grid grid-cols-2 mb-8 shadow-sm bg-white rounded-lg overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center justify-center gap-2 py-3 font-medium transition-colors ${activeTab === tab.key
                ? `bg-${tab.color}-500 text-white`
                : `bg-white text-gray-700 hover:bg-${tab.color}-100`
              }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {getTabIcon(tab.key)}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
        {getFilteredModules(activeTab)?.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>

  );
}

