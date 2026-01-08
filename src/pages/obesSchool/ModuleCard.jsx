import React, { useState } from 'react'
import { Pencil, Trash } from 'lucide-react';
import EducationDelete from './EducationDelete';
import { Button } from "@material-tailwind/react";
import EducationEditForm from './EducationEditForm';
export default function ModuleCard({ module }) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedEdu, setSelectedEdu] = useState(null);

  const handleShowingInfoEdit = (module) => {
    setSelectedEdu(module);

    setShowModalEdit(true)
  }
  const handleShowingInfoDelete = (module) => {
    setSelectedEdu(module);
    setShowModalDelete(true)
  }

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
      <div className="bg-white h-full rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between mb-2">
            <span className={`px-3 py-1 rounded text-xs font-semibold flex items-center font-heading ${getCategoryColor(module?.category)}`}>
              {module.category}
            </span>
            <div className=" flex gap-3">
              <Button variant="text" size="sm" className="h-8 w-8 p-0 flex justify-center items-center border" onClick={() => handleShowingInfoEdit(module)} >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="text" size="sm" className="h-8 w-8 p-0 flex justify-center items-center border" onClick={() => handleShowingInfoDelete(module)}>
                <Trash className="w-4 h-4" />
              </Button>
            </div>

          </div>
          <h3 className="text-xl font-semibold text-mainHeading mb-1 font-heading ">{module?.topic}</h3>
          <p className=" text-paragraph mb-3 font-heading text-paragraphFont">{module?.modtype} Module</p>

          <div className="mb-4">
            <img
              src={module?.mimage}
              alt="module illustration"
              className="w-full h-48  rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <h4 className="font-bold text-mainHeading mb-2 font-heading text-paragraphFont">Module Content :</h4>
            <div className=" text-paragraph leading-relaxed font-heading text-paragraphFont">{formatModuleInfo(module?.modinfo)}</div>
          </div>
        </div>
      </div>
      <EducationEditForm showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} selectedEdu={selectedEdu}></EducationEditForm>
      <EducationDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} selectedEdu={selectedEdu}></EducationDelete>
    </div>
  )
}
