import React from 'react'
import {Typography,Card,CardBody,Button, Input} from "@material-tailwind/react";
export default function QuestionnaireLists() {

  const headers = ["ID", "Question", "Status", "Actions"];
  const data = [
    { id: 1, question: "what's your name",  status: "Active" },
    { id: 2, question: "what's your name",  status: "Inactive" },
    { id: 3, question: "what's your name",  status: "Active" },
    { id: 4, question: "what's your name",  status: "Inactive" },
    { id: 5, question: "what's your name",  status: "Active" },
    { id: 6, question: "what's your name",  status: "Inactive" },
  ];


  return (

    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h4" color="blue-gray">
          Quesnaries List
        </Typography>
        <Button color="blue">+ Add New</Button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 w-1/3">
        <Input label="Search..." />
      </div>

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
              {data.map(({ id, question, status }, index) => (
                <tr key={id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">{id}</td>
                  <td className="p-4">{question}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button size="sm" color="blue" className="mr-2">
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

  )
}
