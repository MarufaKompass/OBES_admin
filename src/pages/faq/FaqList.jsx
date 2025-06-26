import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import {Typography,Card,CardBody,Button} from "@material-tailwind/react";

import { FaqView, userProfile } from '@/hooks/ReactQueryHooks';
import TopHeader from '@/components/topHeader/TopHeader';

export default function FaqList() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  const { data: userprofile } = useQuery({
    queryKey: ['userprofile',],
    queryFn: userProfile
  });


    const { data: faqViews } = useQuery({
    queryKey: ['faqViews', userprofile?.role],
    queryFn: () => FaqView(userprofile?.role)
  });

  return (
   <>
    {/* <TopHeader
      title="Frequently Asked Questions"
    /> */}
   <Card className="mt-8">
        <CardBody className="overflow-x-auto p-0">
         <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600">
          Find answers to common questions about our products and services.
        </p>
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
               <span  className="text-[14px] font-medium text-gray-800"> ({faq.faqbn})</span> 
           </div>
         
              <span className="text-xl text-gray-500">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 ">
                             <span  className="text-[14px] font-normal text-gray-800"> {faq.fansen}</span> 
                             <p  className="text-[14px] font-normal text-gray-800 mt-2">বাংলা : {faq.fansbn}</p> 
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
