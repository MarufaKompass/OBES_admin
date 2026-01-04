import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import {Calendar, Pencil, ArrowDown, Trash } from 'lucide-react';
import { Card, CardBody, Button } from "@material-tailwind/react";
import { adminProfile, pdfList } from '@/hooks/ReactQueryHooks';
import ModalDeletePdf from './ModalDeletePdf';
import MainButton from '@/components/mainButton/MainButton';
import ModalPdfEdit from './ModalPdfEdit';


export default function PdfList() {

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedPdfId, setSelectedPdfId] = useState(null);
  const navigate = useNavigate();


  const handleShowingInfoEdit = (pdf) => {
    setSelectedPdfId(pdf);
    setShowModalEdit(true)
  }
  const handleShowingInfoDelete = (pdf) => {
    setSelectedPdfId(pdf);
    setShowModalDelete(true)
  }


  const handleAddClick = () => {
    navigate("/dashboard/material/addPdf");
  };

  const { data: profile } = useQuery({
    queryKey: ['profile',],
    queryFn: adminProfile
  });

  const { data: pdfLists } = useQuery({
    queryKey: ['pdfLists', profile?.role],
    queryFn: () => pdfList(profile?.role)
  });

  return (
    <>
      <Card className="mt-8 px-4">
        <CardBody className="overflow-x-auto p-0">
          <div className="w-full  mx-auto   py-6">

            <div className="flex justify-between gap-4 my-6 mx-4">
              <div className="">
                <h2 className="text-h3 font-bold mb-1 text-mainHeading font-heading">PDF Archive</h2>
                <p className="text-paragraph text-paragraphFont font-heading">
                  Browse and access all available Pdf
                </p>
              </div>
              <div className='flex items-center'>

                <MainButton onClick={handleAddClick}>
                  + Add Button
                </MainButton>
              </div>
            </div>

            <div className="py-6">
              <hr />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {/* List Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  <div className="col-span-2 text-paragraph font-heading text-paragraphFont">Image</div>
             
                  <div className="col-span-3 text-paragraph font-heading text-paragraphFont">Title</div>
                  <div className="col-span-4 text-paragraph font-heading text-paragraphFont">Summary</div>
                  <div className="col-span-1 text-paragraph font-heading text-paragraphFont">Actions</div>
                </div>
              </div>
              {/* List Items */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {pdfLists?.map((pdf, index) => (
                  <div
                    key={pdf.id}
                    className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Cover Image */}
                      <div className="col-span-2">
                        <img
                          src={pdf?.coverimage}
                          alt={pdf?.title}
                          width={60}
                          height={60}
                          className="w-12 h-12 rounded-md object-cover border border-gray-200 dark:border-gray-600"
                        />
                      </div>
                      {/* Title */}
                      <div className="col-span-3">
                        <h3 className="font-medium  dark:text-white text-sm leading-tight text-paragraph font-heading text-paragraphFont">
                          {pdf?.title}
                        </h3>
                      </div>
                      {/* Summary */}
                      <div className="col-span-4">
                        <p className="text-sm dark:text-gray-400 line-clamp-2 text-paragraph font-heading text-paragraphFont">{pdf.short_summary}</p>
                      </div>
                      {/* Actions */}
                      <div className="col-span-1">
                        <div className="flex space-x-1">
                          <Button variant="text" size="sm" className="h-8 w-8 p-0 flex justify-center items-center" onClick={() => handleShowingInfoEdit(pdf)} >
                            <Pencil className="w-5 h-5" />
                          </Button>
                          <Button variant="text" size="sm" className="h-8 w-8 p-0 flex justify-center items-center" onClick={() => handleShowingInfoDelete(pdf)}>
                            <Trash className="w-5 h-5" />
                          </Button>
                          <a href={pdf?.pdflink} target="_blank" rel="noopener noreferrer">
                            <Button variant="text" size="sm" className="h-8 w-8 p-0 flex justify-center items-center"  >
                              <ArrowDown className="w-5 h-5" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Summary Stats */}
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div>Showing {pdfLists?.length} Pdf</div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Last updated: Today</span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <ModalPdfEdit showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} selectedPdfId={selectedPdfId}></ModalPdfEdit>
      <ModalDeletePdf showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} selectedPdfId={selectedPdfId}></ModalDeletePdf>
    </>
  )
}
