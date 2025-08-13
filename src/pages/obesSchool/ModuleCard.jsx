import React from 'react'

export default function ModuleCard({module}) {
  console.log("module", module)

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
    <div>
       <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(module?.category)}`}>
            {module.category}
          </span>
          <span className="px-2 py-1 rounded border text-xs font-medium">{module?.modnum}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{module?.topic}</h3>
        <p className="text-sm text-gray-500 mb-3">{module?.modtype} Module</p>

        <div className="mb-4">
          <img
            src={module?.mimage}
            alt="module illustration"
            // width={300}
            // height={300}
            className="w-full  object-cover rounded-lg bg-gray-100"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Module Content:</h4>
          <div className="text-sm text-gray-600 leading-relaxed">{formatModuleInfo(module?.modinfo)}</div>
        </div>
      </div>
    </div>
    </div>
  )
}
