import React, { useState } from 'react'
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { allQuestionView, userProfile } from '@/hooks/ReactQueryHooks';
import { useQuery } from '@tanstack/react-query';
import TopHeader from '@/components/topHeader/TopHeader';
import ModalQuestionDetails from './ModalQuestionDetails';
import { View ,Pencil,Trash} from 'lucide-react';
import ModalEditQuestion from './ModalEditQuestion';
export default function QuestionnaireLists() {
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);


  const handleShowingInfo = (question) => {
    setSelectedQuestion(question);
    setShowModal(true)
  }
  const handleShowingInfoEdit = (question) => {
     setSelectedQuestion(question);
    setShowModalEdit(true)
  }

  const headers = ["ID", "Question", "Category", "Actions"];

 const { data: userprofile} = useQuery({
    queryKey: ['userprofile'],
    queryFn: userProfile
  });

  const { data: questionView } = useQuery({
    queryKey: ['quesView',userprofile?.role],
    queryFn: () => allQuestionView(userprofile?.role)
  });

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <TopHeader
          title="Questionnaires List"
        />

        {/* Table */}
        <Card>
          <CardBody className="overflow-x-auto p-0">
            <table className="w-full min-w-max table-auto text-left">
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
                      <div  className="mr-2 cursor-pointer" onClick={() => handleShowingInfo(question)}>
                         <View size={22} />
                      </div>
                      <div className="mr-2 cursor-pointer" onClick={() => handleShowingInfoEdit(question)}>
                      <Pencil size={22}/>
                      </div>
                      <div className="mr-2 cursor-pointer">
                        <Trash size={22}/>
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
    </>
  )
}
