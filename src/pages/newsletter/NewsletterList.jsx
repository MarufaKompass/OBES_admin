import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { Search, Calendar, Eye, Pencil, ArrowDown, Trash } from 'lucide-react';
import { Card, CardBody, Button } from "@material-tailwind/react";
import { adminProfile, newsletterList } from '@/hooks/ReactQueryHooks';
import ModalEditNewsLetter from './ModalEditNewsLetter';
import ModalDeleteNewsletter from './ModalDeleteNewsletter';
import MainButton from '@/components/mainButton/MainButton';


export default function NewsletterList() {

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedNewsLetterId, setSelectedNewsLetterId] = useState(null);
  const navigate = useNavigate();


  const handleShowingInfoEdit = (newsletter) => {
    setSelectedNewsLetterId(newsletter);

    setShowModalEdit(true)
  }
  const handleShowingInfoDelete = (newsletter) => {
    setSelectedNewsLetterId(newsletter);
    setShowModalDelete(true)
  }


  const handleAddClick = () => {
    navigate("/dashboard/newsletter/addNewsletter");
  };

  const { data: profile } = useQuery({
    queryKey: ['profile',],
    queryFn: adminProfile
  });

  const { data: newsList } = useQuery({
    queryKey: ['newsList', profile?.role],
    queryFn: () => newsletterList(profile?.role)
  });

  return (
    <>
      <Card className="mt-8 px-4">
        <CardBody className="overflow-x-auto p-0">
          <div className="w-full  mx-auto   py-6">

            <div className="flex justify-between gap-4 my-6 mx-4">
              <div className="">
                <h2 className="text-h3 font-bold mb-1 text-mainHeading font-heading">Newsletter Archive</h2>
                <p className="text-paragraph text-paragraphFont font-heading">
                  Browse and access all available newsletters
                </p>
              </div>
              <div className='flex items-center'>

                <MainButton onClick={handleAddClick} >
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
                  <div className="col-span-1 text-paragraph font-heading text-paragraphFont">Image</div>
                  <div className="col-span-1 text-paragraph font-heading text-paragraphFont">ID</div>
                  <div className="col-span-2 text-paragraph font-heading text-paragraphFont">Issue No</div>
                  <div className="col-span-4 text-paragraph font-heading text-paragraphFont">Title</div>
                  <div className="col-span-3 text-paragraph font-heading text-paragraphFont">Summary</div>
                  <div className="col-span-1 text-paragraph font-heading text-paragraphFont">Actions</div>
                </div>
              </div>
              {/* List Items */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {newsList?.map((newsletter, index) => (
                  <div
                    key={newsletter.id}
                    className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Cover Image */}
                      <div className="col-span-1">
                        <img
                          src={newsletter?.coverimage}
                          alt={newsletter?.title}
                          width={60}
                          height={60}
                          className="w-12 h-12 rounded-md object-cover border border-gray-200 dark:border-gray-600"
                        />
                      </div>
                      {/* ID */}
                      <div className="col-span-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-mono text-gray-600 dark:text-gray-300">{index}</span>
                        </div>
                      </div>
                      {/* Issue Number */}
                      <div className="col-span-2 border border-[#f1f1f1] w-16 flex justify-center rounded-[60%] py-1">
                        <span className="text-sm font-mono  dark:text-gray-300 text-paragraph font-heading text-paragraphFont">{newsletter?.issuenumber}</span>
                      </div>
                      {/* Title */}
                      <div className="col-span-4">
                        <h3 className="font-medium  dark:text-white text-sm leading-tight text-paragraph font-heading text-paragraphFont">
                          {newsletter?.title}
                        </h3>
                      </div>
                      {/* Summary */}
                      <div className="col-span-3">
                        <p className="text-sm dark:text-gray-400 line-clamp-2 text-paragraph font-heading text-paragraphFont">{newsletter.short_summary}</p>
                      </div>
                      {/* Actions */}
                      <div className="col-span-1">
                        <div className="flex space-x-1">
                          <Button variant="text" size="sm" className="h-8 w-8 p-0 flex justify-center items-center" onClick={() => handleShowingInfoEdit(newsletter)} >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="text" size="sm" className="h-8 w-8 p-0 flex justify-center items-center" onClick={() => handleShowingInfoDelete(newsletter)}>
                            <Trash className="w-4 h-4" />
                          </Button>

                          <a href={newsletter?.pdflink} target="_blank">
                            <Button variant="text" size="sm" className="h-8 w-8 p-0 flex justify-center items-center"  >
                              <ArrowDown className="w-4 h-4" />
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
              <div>Showing {newsList?.length} newsletters</div>
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
      <ModalEditNewsLetter showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} selectedNewsLetterId={selectedNewsLetterId}></ModalEditNewsLetter>
      <ModalDeleteNewsletter showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} selectedNewsLetterId={selectedNewsLetterId}></ModalDeleteNewsletter>
    </>
  )
}
