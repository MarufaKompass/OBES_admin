import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { View, Pencil, Trash } from 'lucide-react';
import { Typography, Card, CardBody } from "@material-tailwind/react";

import { adminProfile, allDoctorQuestionView, allQuestionView } from '@/hooks/ReactQueryHooks';
import ModalQuestionDetails from './ModalQuestionDetails';
import ModalEditQuestion from './ModalEditQuestion';
import ModalDeleteQuestion from './ModalDeleteQuestion';
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';
import MainButton from '@/components/mainButton/MainButton';


export default function DoctorQuestionnaireLists() {
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


  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });

  const { data: doctorQuestionView } = useQuery({
    queryKey: ['quesView', profile?.role],
    queryFn: () => allDoctorQuestionView(profile?.role)
  });

  return (
    <>
      <div className="p-6">
        <Card>
          <CardBody className="overflow-x-auto py-6">
            <div className='flex justify-between'>
              <div className="">
                <h2 className="text-h3 font-bold mb-1 text-mainHeading font-heading">Questionnaires Lists</h2>
                <p className="text-paragraph text-paragraphFont font-heading">
                  Find answers to common questions about our products and services.
                </p>
              </div>
              <div className="flex items-center gap-4 ">
                <div >
                  <MainButton onClick={handleAddClick} variant="primary">
                    + Create Question
                  </MainButton>
                </div>
              </div>
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
                {doctorQuestionView?.map((question, index) => (
                  <tr key={question?.qid} className="even:bg-blue-gray-50/50">
                    <td className="p-4 text-[16px] ">{index}</td>
                    <td className="p-4 ">
                      <Typography className="text-[16px] font-semibold text-mainHeading  font-heading"> {question?.qeng?.slice(0, 65)}...</Typography>
                      {/* <Typography className="text-[16px] font-medium text-paragraphFont font-heading">{question?.qbang?.slice(0, 65)}...</Typography> */}
                    </td>
                    <td className="p-4 text-[16px]  text-paragraphFont font-heading">{question?.category}</td>

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
