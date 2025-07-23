import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Card, CardBody } from "@material-tailwind/react";
import { FaqView, userProfile } from '@/hooks/ReactQueryHooks';
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';
export default function FaqList() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  const { data: userprofile } = useQuery({
    queryKey: ['userprofile',],
    queryFn: userProfile
  });

  const handleAddClick = () => {
    navigate("/dashboard/faq/addFaq");
  };


  const { data: faqViews } = useQuery({
    queryKey: ['faqViews', userprofile?.role],
    queryFn: () => FaqView(userprofile?.role)
  });

  return (
    <>

      <Card className="mt-8 px-4">
        <CardBody className="overflow-x-auto p-0">
          <div className="w-full  mx-auto   py-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 font-poppins">Frequently Asked Questions</h2>
              <p className="text-[16px] text-gray-500 font-poppins">
                Find answers to common questions about our products and services.
              </p>
            </div>


            <div className="flex justify-end gap-4 ">
              <div className="relative w-full md:w-1/3">
                <div className="absolute top-2 left-2">
                  <Search />
                </div>
                <input
                  className="border border-[#a5a5a5] w-full py-2  rounded-lg pl-10 outline-primaryBg"
                  placeholder='search'/>

              </div>
              <button onClick={handleAddClick} className="flex items-center gap-2 bg-primaryBg text-white px-4 rounded-md">
                + Add Button
              </button>
            </div>

            <div className="py-6">
              <hr />
            </div>

            <div className="space-y-6">
              {faqViews?.map((faq, index) => (
                <div
                  key={faq.faqid}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <span className="text-[16px] font-medium text-gray-800">{faq.faqen}</span>
                      <span className="text-[14px] font-medium text-gray-800"> ({faq.faqbn})</span>
                    </div>

                    <span className="text-xl text-gray-500">
                      {openIndex === index ? "-" : "+"}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4 ">
                      <span className="text-[14px] font-normal text-gray-800"> {faq.fansen}</span>
                      <p className="text-[14px] font-normal text-gray-800 mt-2">বাংলা : {faq.fansbn}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card></>
  )
}
