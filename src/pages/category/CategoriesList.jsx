import React, { useState } from 'react'
import { Typography, Card, CardBody, Button,Spinner ,Alert } from "@material-tailwind/react";
import { useQuery } from '@tanstack/react-query';
import { CategoryView, userProfile } from '@/hooks/ReactQueryHooks';
import TopHeader from '@/components/topHeader/TopHeader';
import { View, Pencil, Trash } from 'lucide-react';
import ModalCategoryDelete from './ModalCategoryDelete';
export default function CategoriesList() {
    const [showModalDelete, setShowModalDelete] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState(null)
   const handleShowingInfoDelete = (category) => {
    setSelectedCategory(category);
    setShowModalDelete(true)
  }



  const TABLE_HEAD = ["ID", "Category Name", "Category By", "Action"];

  const { data: userprofile, isLoading: isUserLoading, isError: isUserError, error: userError } = useQuery({
    queryKey: ['userprofile'],
    queryFn: userProfile
  });


  const { data: catView, isLoading: isCatLoading, isError: isCatError, error: catError } = useQuery({
    queryKey: ['catView',userprofile?.role],
    queryFn: () => CategoryView(userprofile?.role),
    enabled: !!userprofile?.role,
  });

  return (
    <>
      <TopHeader title="Questionnaires List" />

      <Card>
        <CardBody className="overflow-x-auto p-4">


          {isUserLoading && (
            <div className="flex justify-center items-center h-full">
              <Spinner color="blue" />
              <span className="ml-2">Loading user profile...</span>
            </div>
          )}

          {isUserError && (
            <Alert color="red">
              Failed to load user profile: {userError?.message || "Unknown error"}
            </Alert>
          )}


          {!isUserLoading && isCatLoading && (
            <div className="flex justify-center items-center">
              <Spinner color="blue" />
              <span className="ml-2">Loading categories...</span>
            </div>
          )}

          {!isUserLoading && isCatError && (
            <Alert color="red">
              Failed to load categories: {catError?.message || "Unknown error"}
            </Alert>
          )}


          {!isUserLoading && !isUserError && !isCatLoading && !isCatError && (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
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
                    <td className="p-4">{cat?.catname}</td>
                    <td className="p-4">{cat?.catby}</td>
         
                         <td className="p-4 flex gap-2">
                      <div className="mr-2 cursor-pointer" onClick={() => handleShowingInfo(cat)}>
                        <View size={22} />
                      </div>
                      <div className="mr-2 cursor-pointer" onClick={() => handleShowingInfoEdit(cat)}>
                        <Pencil size={22} />
                      </div>
                      <div className="mr-2 cursor-pointer" onClick={() => handleShowingInfoDelete(cat)}>
                        <Trash size={22} />
                      </div>
                    </td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>

     <ModalCategoryDelete selectedCategory={selectedCategory} showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete}></ModalCategoryDelete>
    </>
  )
}
