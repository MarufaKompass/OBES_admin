import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminProfile, allUserView, stepsList } from '@/hooks/ReactQueryHooks';
import { Users, UserCheck, Stethoscope } from "lucide-react"


function getRoleBadge(role) {
  const baseClasses = "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded";
  switch (role) {
    case "doctor":
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`}>
          <Stethoscope className="w-3 h-3 mr-1" />
          Doctor
        </span>
      );
    case "admin":
      return (
        <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
          <UserCheck className="w-3 h-3 mr-1" />
          Admin
        </span>
      );
    case "user":
      return (
        <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
          <Users className="w-3 h-3 mr-1" />
          User
        </span>
      );
    default:
      return <span className="border px-2 py-0.5 rounded">{role}</span>;
  }
}


export default function UserLists() {


  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });


const { data: usersView, isLoading } = useQuery({
  queryKey: ['userView', profile?.role],
  queryFn: () => allUserView(profile?.role)
});
console.log("usersView", usersView);

  const roleStats = usersView?.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

function getInitials(name) {
  if (!name || typeof name !== "string") return ""; 
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}



  return (
    <>
      <div className="mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Users */}
          <div className="bg-white shadow rounded p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 font-poppins">Total Users</p>
                <p className="text-2xl font-bold font-poppins">{usersView?.length}</p>
              </div>
            </div>
          </div>

          {/* Doctors */}
          <div className="bg-white shadow rounded p-4">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-gray-500 font-poppins">Doctors</p>
                <p className="text-2xl font-bold text-green-600 font-poppins">{roleStats?.doctor || 0}</p>
              </div>
            </div>
          </div>

          {/* Admins */}
          <div className="bg-white shadow rounded p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500 font-poppins">Admins</p>
                <p className="text-2xl font-bold text-blue-600 font-poppins">{roleStats?.admin || 0}</p>
              </div>
            </div>
          </div>

          {/* Regular Users */}
          <div className="bg-white shadow rounded p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Regular Users</p>
                <p className="text-2xl font-bold text-gray-600">{roleStats?.user || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white shadow rounded">
          <div className="border-b p-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold font-poppins">
              <Users className="h-5 w-5" />
              User Management
            </h2>
            <p className="text-sm text-gray-500 font-poppins">Manage and view all users in your system</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="p-3 font-poppins ">ID</th>
                  <th className="p-3 font-poppins ">User</th>
                  <th className="p-3 font-poppins ">phone</th>
                  <th className="p-3 font-poppins ">Role</th>
                  <th className="p-3 font-poppins ">Gender</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {usersView?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{user.id}</td>
                    <td className="p-3 flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold font-poppins">
                        {getInitials(user.fulname)}
                      </div>
                      <div>
                        <p className="font-normal font-poppins">{user.fulname}</p>
                      </div>
                    </td>
                    <td className="p-3 capitalize text-gray-600 font-poppins">{user.logmobile}</td>
                    <td className="p-3">{getRoleBadge(user.role)}</td>
                    <td className="p-3 capitalize text-gray-600 font-poppins">{user.ogender}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>

  );
}
