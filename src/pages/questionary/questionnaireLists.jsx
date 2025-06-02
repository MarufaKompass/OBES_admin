import React, { useState } from 'react'
import {Typography,Card,CardBody,Button, Input} from "@material-tailwind/react";
import { allQuestionView } from '@/hooks/ReactQueryHooks';
import { useQuery } from '@tanstack/react-query';
import TopHeader from '@/components/topHeader/TopHeader';
import ModalQuestionDetails from './ModalQuestionDetails';
export default function QuestionnaireLists() {
  const [showModal, setShowModal] = useState(false);
const [selectedQuestion, setSelectedQuestion] = useState(null); 


const handleShowingInfo = (question) => {
   setSelectedQuestion(question);
   setShowModal(true)
}

  const headers = ["ID", "Question", "Category", "Actions"];

    const { data: questionView } = useQuery({
    queryKey: ['quesView'],
    queryFn: allQuestionView
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
              {questionView?.map(( question ) => (
                <tr key={question?.qid} className="even:bg-blue-gray-50/50">
                       <td className="p-4 text-[16px] ">{question?.qid}</td>
                  <td className="p-4 "> 
                    <Typography  className="text-[16px] font-semibold">{question?.qeng}</Typography>
                    <Typography  className="text-[15px] font-medium">{question?.qbang}</Typography>
                  </td>
                  <td className="p-4 text-[16px] ">{question?.category}</td>
                 
                  <td className="p-4">
                    <Button size="sm" color="blue" className="mr-2"  onClick={() => handleShowingInfo(question)}>
                      View
                    </Button>
                    <Button size="sm" color="green" className="mr-2">
                      Edit
                    </Button>
                    <Button size="sm" color="red">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

    </div>
       <ModalQuestionDetails showModal={showModal} setShowModal={setShowModal} selectedQuestion={selectedQuestion}></ModalQuestionDetails>
</>
  )
}
