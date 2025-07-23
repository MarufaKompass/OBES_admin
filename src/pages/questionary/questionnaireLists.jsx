import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { View, Pencil, Trash } from 'lucide-react';
import { Typography, Card, CardBody } from "@material-tailwind/react";

import { allQuestionView, userProfile } from '@/hooks/ReactQueryHooks';
import ModalQuestionDetails from './ModalQuestionDetails';
import TopHeader from '@/components/topHeader/TopHeader';
import ModalEditQuestion from './ModalEditQuestion';
import ModalDeleteQuestion from './ModalDeleteQuestion';
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';
export default function QuestionnaireLists() {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate();
  const headers = ["ID", "Question", "Category", "Actions"];

  const handleShowingInfo = (question) => {
    setSelectedQuestion(question);
    setShowModal(true)
  }
  const handleShowingInfoEdit = (question) => {
    setSelectedQuestion(question);
    setShowModalEdit(true)
  }

  const handleShowingInfoDelete = (question) => {
    setSelectedQuestion(question);
    setShowModalDelete(true)
  }

  const handleAddClick = () => {
    navigate("/dashboard/questionary/questionnaires");
  };


  const { data: userprofile } = useQuery({
    queryKey: ['userprofile'],
    queryFn: userProfile
  });

  const { data: questionView } = useQuery({
    queryKey: ['quesView', userprofile?.role],
    queryFn: () => allQuestionView(userprofile?.role)
  });

  return (
    <>
      <div className="p-6">
        <Card>
          <CardBody className="overflow-x-auto py-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 font-poppins">Questionnaires  Lists</h2>
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
                  placeholder='search' />

              </div>
              <button onClick={handleAddClick} className="flex items-center gap-2 bg-primaryBg text-white px-4 rounded-md">
                + Add Button
              </button>
            </div>

            <div className="py-6">
              <hr />
            </div>


            <table className="w-full m-auto table-auto text-left">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {header}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {questionView?.map((question) => (
                  <tr key={question?.qid} className="even:bg-blue-gray-50/50">
                    <td className="p-4 text-[16px] ">{question?.qid}</td>
                    <td className="p-4 ">
                      <Typography className="text-[16px] font-semibold"> {question?.qeng?.slice(0, 65)}...</Typography>
                      <Typography className="text-[15px] font-medium">{question?.qbang?.slice(0, 65)}...</Typography>
                    </td>
                    <td className="p-4 text-[16px] ">{question?.category}</td>

                    <td className="p-4 flex gap-2">
                      <div className="mr-2 cursor-pointer" onClick={() => handleShowingInfo(question)}>
                        <View size={22} />
                      </div>
                      <div className="mr-2 cursor-pointer" onClick={() => handleShowingInfoEdit(question)}>
                        <Pencil size={22} />
                      </div>
                      <div className="mr-2 cursor-pointer" onClick={() => handleShowingInfoDelete(question)}>
                        <Trash size={22} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      <ModalQuestionDetails showModal={showModal} setShowModal={setShowModal} selectedQuestion={selectedQuestion}></ModalQuestionDetails>
      <ModalEditQuestion showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} selectedQuestion={selectedQuestion}></ModalEditQuestion>
      <ModalDeleteQuestion showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} selectedQuestion={selectedQuestion}></ModalDeleteQuestion>
    </>
  )
}
