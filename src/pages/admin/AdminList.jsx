import React from 'react'
import { Typography, Card, CardBody, Spinner, Alert } from "@material-tailwind/react";
import { useQuery } from '@tanstack/react-query';
import { adminList, adminProfile } from '@/hooks/ReactQueryHooks';
import { Pencil, Trash } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';

export default function AdminList() {

    const navigate = useNavigate();


    const handleAddClick = () => {
      navigate("/dashboard/admin/addAdmin");
    };
  
    const TABLE_HEAD = ["ID", "Admin Name", "Admin phone ", "Role", "Status", "Action"];
  
    const { data: profile, isLoading: isUserLoading, isError: isUserError, error: userError } = useQuery({
      queryKey: ['profile'],
      queryFn: adminProfile
    });
  
  
    const { data: adminView, isLoading: isCatLoading, isError: isCatError, error: catError } = useQuery({
      queryKey: ['adminList', profile?.role],
      queryFn: () => adminList(profile?.role)
    });

    console.log("adminView", adminView)
  return (
    <div><>
      <Card>
        <CardBody className="overflow-x-auto p-4">

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 font-poppins">Category Lists</h2>
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
              + Create Admin
            </button>
          </div>
          <div className="py-6">
            <hr />
          </div>
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
                {adminView?.map((admin,index) => (
                  <tr key={admin?.catid} className="even:bg-blue-gray-50/50">
                    <td className="p-4">{index}</td>
            
                    <td className="p-4 flex items-center gap-2"> 
                      <img src={admin?.imgpath} className="w-10 h-8"/>
                     <span>
                       {admin?.fulname}
                     </span>
                      </td>
                    <td className="p-4">
                      {admin?.logmobile}

                    </td>
                    <td className="p-4">{admin?.role}</td>
                    <td className="p-4">{admin?.status}</td>

                    <td className="p-4 flex gap-2">
                      {/* <div className="mr-2 cursor-pointer" onClick={() => handleShowingInfo(cat)}>
                        <View size={22} />
                      </div> */}
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

      {/* <ModalCategoryDelete selectedCategory={selectedCategory} showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete}></ModalCategoryDelete>
      <ModalCategoryEdit setShowModalEdit={setShowModalEdit} showModalEdit={showModalEdit} selectedCategory={selectedCategory}></ModalCategoryEdit> */}

    </></div>
  )
}
