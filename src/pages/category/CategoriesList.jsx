import React, { useState } from 'react'
import { Typography, Card, CardBody, Button, Spinner, Alert } from "@material-tailwind/react";
import { useQuery } from '@tanstack/react-query';
import { adminProfile, CategoryView } from '@/hooks/ReactQueryHooks';
import { SquarePen, Trash } from 'lucide-react';
import ModalCategoryDelete from './ModalCategoryDelete';
import ModalCategoryEdit from './ModalCategoryEdit';
import { useNavigate } from "react-router-dom";

import MainButton from '@/components/mainButton/MainButton';
export default function CategoriesList() {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showModalEdit, setShowModalEdit] = useState(null)
  const navigate = useNavigate();
  const handleShowingInfoDelete = (category) => {
    setSelectedCategory(category);
    setShowModalDelete(true)
  }

  const handleShowingInfoEdit = (category) => {
    setSelectedCategory(category);
    setShowModalEdit(true)
  }

  const handleAddClick = () => {
    navigate("/dashboard/category/addCategory");
  };

  const TABLE_HEAD = ["ID", "Category Name", "Category Bangla", "Category By", "Action"];

  const { data: profile, isLoading: isUserLoading, isError: isUserError, error: userError } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });


  const { data: catView, isLoading: isCatLoading, isError: isCatError, error: catError } = useQuery({
    queryKey: ['catView', profile?.role],
    queryFn: () => CategoryView(profile?.role),
    enabled: !!profile?.role,
  });

  return (
    <>
      <Card>
        <CardBody className="overflow-x-auto p-4">
          <div className="flex justify-between mt-6">
            <div className=" mb-2">
              <h2 className="text-h3 font-bold mb-1 text-mainHeading font-heading">Category Lists</h2>
              <p className="text-paragraph text-paragraphFont font-heading">
                Find answers to common questions about our products and services.
              </p>
            </div>

            <div className="flex items-center">
              <MainButton onClick={handleAddClick} variant="primary">
                + Crate Category
              </MainButton>
            </div>
          </div>

          <div className="py-6">
            <hr />
          </div>
          {isUserLoading && (
            <div className="flex justify-center items-center h-screen">
              <Spinner color="#7B1E19" />
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
                {catView?.map((cat, index) => (
                  <tr key={cat?.catid} className="even:bg-blue-gray-50/50 font-heading text-paragraphFont text-paragraph ">
                    <td className="p-4">{index}</td>
                    <td className="p-4">{cat?.catname}</td>
                    <td className="p-4">{cat?.catbangla}</td>
                    <td className="p-4">{cat?.catby}</td>
                    <td className="p-4 flex gap-2">
                      <div className="mr-2 cursor-pointer" onClick={() => handleShowingInfoEdit(cat)}>
                        <SquarePen size={22} />
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
      <ModalCategoryEdit setShowModalEdit={setShowModalEdit} showModalEdit={showModalEdit} selectedCategory={selectedCategory}></ModalCategoryEdit>

    </>
  )
}
