import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Card, CardBody } from "@material-tailwind/react";
import { adminProfile, expertsList } from '@/hooks/ReactQueryHooks';
import { Mail, Phone, Building2, MapPin, Calendar, Pencil, Trash } from "lucide-react"
import ModalExpertUpdate from './ModalExpertUpdate';
import ModalExpertDelete from './ModalExpertDelete';
export default function ExpertsList() {
  const [showModalEdit, setShowModalEdit] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(null);
  const [showModalExpert, setSelectedExpert] = useState(null);

  const handleShowingInfoEdit = (expertid) => {
    setSelectedExpert(expertid);
    setShowModalEdit(true)
  }

  const handleShowingInfoDelete = (category) => {
    setSelectedExpert(category);
    setShowModalDelete(true)
  }



  const { data: profile } = useQuery({
    queryKey: ['profile',],
    queryFn: adminProfile
  });

  const { data: experts } = useQuery({
    queryKey: ['experts', profile?.role],
    queryFn: () => expertsList(profile?.role)
  });


  // const experts = experts.length > 0 ? experts : sampleExperts

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <Card className="mt-8 px-4">
        <CardBody className="overflow-x-auto p-0">
          <div className="w-full  mx-auto py-6">
            <div className=" mb-8 border-b pb-3">
              <h1 className="text-h3 font-bold mb-1 text-mainHeading font-heading00">Our Medical Experts</h1>
              <p className="text-paragraph text-paragraphFont font-heading">Meet our team of qualified healthcare professionals</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experts?.map((expert) => (
                <div
                  key={expert.id}
                  className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative  bg-gray-200">
                    <img
                      src={expert.drimg}
                      alt={expert.drname}
                      className="w-full h-[360px] object-cover"

                    />
                    <span
                      className={`absolute top-3 left-3 text-xs px-2 py-1 font-heading rounded-full text-white ${expert.status === "active" ? "bg-green-500" : "bg-gray-500"
                        }`}
                    >
                      {expert.status}
                    </span>

                    <div className='absolute  top-3 right-3  flex gap-2'>
                      <button className="text-white  bg-primary h-8 w-8 flex justify-center items-center rounded-full" onClick={() => handleShowingInfoEdit(expert)}>
                        <div className="cursor-pointer" >
                          <Pencil size={18} />
                        </div>
                      </button>

                      <button className="text-white  bg-primary  h-8 w-8 flex justify-center items-center rounded-full" onClick={() => handleShowingInfoDelete(expert)}>
                        <div className="cursor-pointer" >
                          <Trash size={18} />
                        </div>
                      </button>
                    </div>

                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-h5 font-semibold text-mainHeading ">{expert.drname}</h3>
                      <p className="font-small text-primary font-heading font-semibold mt-1">{expert.designation}</p>
                      {expert.add_desig && <p className="text-small text-paragraph mt-2">{expert.add_desig}</p>}
                    </div>

                    <div className="space-y-1  text-paragraph font-heading ">
                      <p className='text-small text-paragraph'><strong>Hospital:</strong> {expert.hospital}</p>
                      {expert.add_org && <p><strong>Org:</strong> {expert.add_org}</p>}
                    </div>

                    <div className="space-y-1 text-sm text-paragraph font-heading ">
                      <p><strong>Email:</strong> {expert.email}</p>
                      <p><strong>Mobile:</strong> {expert.mobile}</p>
                    </div>

                    <div className="text-xs text-paragraph pt-2 border-t">
                      Updated: {formatDate(expert.updated_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {experts?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No experts found</p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
      <ModalExpertUpdate showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} showModalExpert={showModalExpert}></ModalExpertUpdate>
      <ModalExpertDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} showModalExpert={showModalExpert}></ModalExpertDelete>
    </>
  )
}
