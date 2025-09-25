import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Card, CardBody } from "@material-tailwind/react";
import { adminProfile, FaqView } from '@/hooks/ReactQueryHooks';
import { useNavigate } from "react-router-dom";
import { SquarePen, Trash } from 'lucide-react';
import MainButton from '@/components/mainButton/MainButton';
import ModalDeleteFaq from './ModalDeleteFaq';
import ModalEditFaq from './ModalEditFaq';
export default function FaqList() {
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(null)
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const handleShowingInfoDelete = (faq) => {
    setSelectedFaq(faq);
    setShowModalDelete(true)
  }

  const handleShowingInfoEdit = (faq) => {
    setSelectedFaq(faq);
    setShowModalEdit(true)
  }


  const handleAddClick = () => {
    navigate("/dashboard/faq/addFaq");
  };

  const { data: profile } = useQuery({
    queryKey: ['profile',],
    queryFn: adminProfile
  });

  const { data: faqViews } = useQuery({
    queryKey: ['faqViews', profile?.role],
    queryFn: () => FaqView(profile?.role)
  });

  return (
    <>

      <Card className="mt-8 px-4">
        <CardBody className="overflow-x-auto p-0">
          <div className="w-full mx-auto py-6">

            <div className='flex justify-between'>
              <div className="my-6">
                <h2 className="text-h3 font-bold mb-1 text-mainHeading font-heading">Frequently Asked Questions</h2>
                <p className="text-paragraph text-paragraphFont font-heading">
                  Find answers to common questions about our products and services.
                </p>
              </div>
              <div className="gap-4 flex items-center">
                <MainButton onClick={handleAddClick} variant="primary">
                  + Add Button
                </MainButton>
              </div>

            </div>
            <div className="py-6">
              <hr />
            </div>

            <div className="space-y-6 ">
              {faqViews?.map((faq, index) => (
                <div key={faq.faqid} className="bg-white rounded-xl grid grid-cols-11 gap-10">

                  <div className="shadow-md border border-gray-200 overflow-hidden col-span-10">
                    <div>

                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <span className="text-[16px] font-medium text-mainHeading">{faq.faqen}</span>
                          <span className="text-[14px] font-medium text-mainHeading"> ({faq.faqbn})</span>
                        </div>

                        <span className="text-xl text-gray-500">
                          {openIndex === index ? "-" : "+"}
                        </span>
                      </button>
                      {openIndex === index && (
                        <div className="px-6 pb-4 ">
                          <span className="text-[14px] font-normal text-paragraph"> {faq.fansen}</span>
                          <p className="text-[14px] font-normal text-paragraph mt-2">{faq.fansbn}</p>
                        </div>
                      )}
                    </div>

                  </div>


                  <div className="flex items-center gap-2 ">
                    <div>
                      <button onClick={() => handleShowingInfoDelete(faq)}>
                        <Trash size={20}></Trash>
                      </button>
                    </div >

                    <div>
                      <button onClick={() => handleShowingInfoEdit(faq)}>
                        <SquarePen size={20} />
                      </button>
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <ModalDeleteFaq selectedFaq={selectedFaq} showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} ></ModalDeleteFaq>
      <ModalEditFaq selectedFaq={selectedFaq} showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} ></ModalEditFaq>
    </>
  )
}
