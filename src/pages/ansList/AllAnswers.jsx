import React from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import excel from "../../../public/img/excel.png";
import { Mail, Phone, Eye, User } from "lucide-react";
import { adminProfile, allUserAnsList, csvExport } from '@/hooks/ReactQueryHooks';

export default function AllAnswers() {
    const navigate = useNavigate();

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: adminProfile
    });
    const { refetch } = useQuery({
        queryKey: ['csvEx'],
        queryFn: () => csvExport(profile?.role),
        enabled: false
    });

    const handleCsvDownload = async () => {
        const res = await refetch();
        if (res.data) {
            const url = window.URL.createObjectURL(new Blob([res.data.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "qans_last_answers.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };

    const { data: answersList, isLoading } = useQuery({
        queryKey: ['answersList', profile?.role],
        queryFn: () => allUserAnsList(profile?.role)
    });


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
                        <div className="  items-center">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-gray-700" />
                                <div>
                                    <Typography variant="h5" color="blue-gray" className="font-poppins">
                                        Total Respondents
                                    </Typography>
                                    <Typography variant="small" color="gray" className="font-normal font-poppins">
                                        Manage and view respondents details
                                    </Typography>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 border h-[140px] mt-8 rounded-sm'>
                                <div className='flex justify-center items-center text-center border'>
                                    <div>
                                        <h2 className='font-poppins text-black text-[20px] font-medium'>Number of Respondent</h2>
                                        <p className='font-poppins text-black text-[20px] font-bold'>{answersList?.length}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 justify-center items-center text-center">
                                    <div className=''>
                                        <button className="border border-[#f1f1f1] p-2 rounded-[50%] hover:bg-[#f1f1f1] hover:border-[#f1f1f1]" onClick={handleCsvDownload} id="csv-download-btn" >
                                            <img src={excel} alt="" className="w-8 h-8" />
                                        </button>
                                        <p>Download CSV</p>
                                    </div>
                                    <Tooltip anchorSelect="#csv-download-btn" place="top">
                                        Download xls file
                                    </Tooltip>
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
