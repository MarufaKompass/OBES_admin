import React, { useState } from 'react'
import { Typography, Card, CardBody, Spinner, Alert } from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminList, adminProfile, statusUpdate } from '@/hooks/ReactQueryHooks';
import { Pencil } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';
import { useForm, Controller } from "react-hook-form";
import UpdateAdmin from './UpdateAdmin';

export default function AdminList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { control, setValue } = useForm();
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [showModalEdit, setShowModalEdit] = useState(null)

  const handleShowingInfoEdit = (admin) => {
    setSelectedAdmin(admin);
    setShowModalEdit(true)
  }


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


  const { mutateAsync, isLoading: isMutating } = useMutation({
    mutationFn: statusUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
    },
  });



  return (
    <div>
      <Card>
        <CardBody className="overflow-x-auto p-4">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 font-poppins">
              Admin List
            </h2>
            <p className="text-[16px] text-gray-500 font-poppins">
              Manage admin accounts and their status.
            </p>
          </div>

          {/* Search + Create */}
          <div className="flex justify-end gap-4 ">
            <div className="relative w-full md:w-1/3">
              <div className="absolute top-2 left-2">
                <Search />
              </div>
              <input
                className="border border-[#a5a5a5] w-full py-2 rounded-lg pl-10 outline-primaryBg"
                placeholder="search"
              />
            </div>
            <button
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-primaryBg text-white px-4 rounded-md"
            >
              + Create Admin
            </button>
          </div>

          <div className="py-6">
            <hr />
          </div>

          {/* Loading & Error States */}
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
              <span className="ml-2">Loading admins...</span>
            </div>
          )}
          {!isUserLoading && isCatError && (
            <Alert color="red">
              Failed to load admins: {catError?.message || "Unknown error"}
            </Alert>
          )}

          {/* Table */}
          {!isUserLoading && !isUserError && !isCatLoading && !isCatError && (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
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
                {adminView?.map((admin, index) => {
                  const adminId = admin?.id;
                  const defaultStatus = admin?.status === "active";

                  return (
                    <tr key={adminId} className="even:bg-blue-gray-50/50">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4 flex items-center gap-2">
                        <img
                          src={admin?.imgpath}
                          className="w-10 h-8"
                          alt="admin"
                        />
                        <span>{admin?.fulname}</span>
                      </td>
                      <td className="p-4">{admin?.logmobile}</td>
                      <td className="p-4">{admin?.role}</td>
                      <td className="p-4">{admin?.status}</td>
                      <td className="p-4 flex gap-4 items-center">
                        <Controller
                          control={control}
                          name={`status_${adminId}`}
                          defaultValue={defaultStatus}
                          render={({ field }) => (
                            <div
                              className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${field.value ? "bg-green-500" : "bg-gray-300"}`}
                              onClick={() => {

                                const newStatus = !field.value;
                                setValue(`status_${adminId}`, newStatus);


                                mutateAsync({
                                  role: profile?.role,
                                  id: adminId,
                                  statusData: { status: newStatus ? "active" : "inactive" },
                                });
                              }}
                            >
                              <div
                                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${field.value ? "translate-x-6" : "translate-x-0"}`}
                              />
                            </div>
                          )}
                        />

                        <div className="mr-2 cursor-pointer" onClick={() => handleShowingInfoEdit(admin)}>
                          <Pencil size={22} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>

      <UpdateAdmin showModalEdit={showModalEdit} selectedAdmin={selectedAdmin} setShowModalEdit={setShowModalEdit}></UpdateAdmin>
    </div>
  )
}