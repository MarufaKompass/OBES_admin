import React from 'react'
import {Typography,Card,CardBody,Button} from "@material-tailwind/react";
import { useQuery } from '@tanstack/react-query';
import { CategoryView } from '@/hooks/ReactQueryHooks';
import TopHeader from '@/components/topHeader/TopHeader';
export default function CategoriesList() {
const TABLE_HEAD = ["ID","Category Name", "Category By" ,"Action"];

    const { data: catView } = useQuery({
    queryKey: ['catView'],
    queryFn: CategoryView
  });

  return (
   <>
    <TopHeader
      title="Questionnaires List"
    />
   <Card>
        <CardBody className="overflow-x-auto p-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD?.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead> 
            <tbody>
               {catView?.map((cat) => (
                <tr key={cat?.catid} className="even:bg-blue-gray-50/50">
                  <td className="p-4">{cat?.catid}</td>
                  <td className="p-4">   {cat?.catname}</td>
                  <td className="p-4">
                      {cat?.catby}
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
      </Card></>
  )
}
