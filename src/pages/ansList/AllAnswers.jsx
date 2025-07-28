import React, { useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { adminProfile, allUserAnsList } from '@/hooks/ReactQueryHooks';
import { Mail, Phone, Eye, User } from "lucide-react";
import csv from "../../../public/img/csv.png";
import txt from "../../../public/img/txt.png";
import pdf from "../../../public/img/pdf.png";
export default function AllAnswers() {
    const [surveyData, setSurveyData] = useState([]);
    const navigate = useNavigate();

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });


    const { data: answersList, isLoading } = useQuery({
        queryKey: ['answersList', profile?.role],
        queryFn: () => allUserAnsList(profile?.role)
    });

    console.log("answersList", answersList);


    const handlePerAnswerHandle = (answer) => {
        navigate(`/dashboard/questionary/answerDetails/${answer.qansjson_id}`, {
            state: { surveyData: answer }
        });
    }
    return (
        <>
            <div className="min-h-full flex items-center justify-center px-4 py-8 mt-4">
                <Card className="w-full mx-auto ">
                    <CardHeader floated={false} shadow={false} className="pb-0">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-gray-700" />
                                <div>
                                    <Typography variant="h5" color="blue-gray" className="font-poppins">
                                        User Information
                                    </Typography>
                                    <Typography variant="small" color="gray" className="font-normal font-poppins">
                                        Manage and view user details
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex gap-2 ">
                                <div className="border border-[#b2b2b2] p-2 rounded-[50%] hover:bg-[#f1f1f1] hover:border-[#f1f1f1]">
                                    <img src={csv} alt="" className="w-5 h-5" />
                                </div>
                                <div className="border border-[#b2b2b2] p-2 rounded-[50%] hover:bg-[#f1f1f1] hover:border-[#f1f1f1]">
                                    <img src={txt} alt="" className="w-5 h-5" />
                                </div>
                                <div className="border border-[#b2b2b2] p-2 rounded-[50%] hover:bg-[#f1f1f1] hover:border-[#f1f1f1]">
                                    <img src={pdf} alt="" className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-x-auto">
                        {isLoading ? (
                            <div className="text-center text-blue-gray-600 py-10">Loading answers...</div>
                        ) : answersList?.length === 0 ? (
                            <div className="text-center text-red-500 py-10">No answers found.</div>
                        ) : (
                            <table className="w-full table-auto text-left">
                                <thead>
                                    <tr className="bg-blue-gray-50">
                                        <th className="p-4 font-normal ">ID</th>
                                        <th className="p-4 font-normal ">Full Name</th>
                                        <th className="p-4 font-normal ">Login Email</th>
                                        <th className="p-4 font-normal "> Mobile</th>
                                        <th className="p-4  font-normal ">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {answersList?.map((answer, index) => (
                                        <tr
                                            key={answer.id}
                                            className={index % 2 === 0 ? "bg-white" : "bg-blue-gray-50"}
                                        >
                                            <td className="p-4 font-medium">{answer?.qansjson_id}</td >
                                            <td  >
                                                <div className="p-4 flex items-center gap-2">
                                                    <User className="h-4 w-4 text-gray-500" />
                                                    {answer?.user?.fulname || 'N/A'}
                                                </div>
                                            </td >
                                            <td  >
                                                <div className="p-4 flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-gray-500" />
                                                    {answer?.user?.logemail || 'N/A'}
                                                </div>
                                            </td >
                                            <td  >
                                                <div className="p-4 flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-gray-500" />
                                                    {answer?.user?.smsmobile || 'N/A'}
                                                </div>
                                            </td >
                                            <td className="p-4 text-right">
                                                <Button
                                                    onClick={() => handlePerAnswerHandle(answer)}
                                                    variant="outlined"
                                                    size="sm"
                                                    className="flex items-center gap-1 border border-[#b2b2b2] text-[#878383]"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </Button>
                                            </td >
                                        </tr >
                                    ))}
                                </tbody>
                            </table >
                        )}
                    </CardBody>
                </Card>
            </div>
        </>
    )
}
