import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminProfile, stepsList } from '@/hooks/ReactQueryHooks';
import { Users, CheckCircle, XCircle } from "lucide-react"
const StatusCell = ({ value }) => {
  const isPositive = value === "Yes";
  return (
    <div className="flex justify-center items-center">
      {isPositive ? (
        <CheckCircle className="w-4 h-4 text-green-600" />
      ) : (
        <XCircle className="w-4 h-4 text-red-600" />
      )}
    </div>
  );
};


export default function Steps() {


  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });



  const { data: stepsView } = useQuery({
    queryKey: ['stepsView', profile?.role],
    queryFn: () => stepsList(profile?.role)
  });
  console.log("stepsView", stepsView);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


  return (
    <>
      <div className="mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        </div>
        {/* User Table */}
        <div className="bg-white shadow rounded">
          <div className="border-b p-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold font-poppins">
              <Users className="h-5 w-5" />
              User 7 Steps List
            </h2>
            <p className="text-sm text-gray-500 font-poppins">Manage and view all users 7 steps list in your system</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 font-semibold">User ID</th>
                  <th className="px-4 py-2 font-semibold">Recorded Date</th>
                  <th className="px-4 py-2 font-semibold text-center">Exercise</th>
                  <th className="px-4 py-2 font-semibold text-center">Fruits & Veg</th>
                  <th className="px-4 py-2 font-semibold text-center">Meals</th>
                  <th className="px-4 py-2 font-semibold text-center">Screen Time</th>
                  <th className="px-4 py-2 font-semibold text-center">Sleep</th>
                  <th className="px-4 py-2 font-semibold text-center">Sugary Drinks</th>
                  <th className="px-4 py-2 font-semibold text-center">Treatment</th>
                </tr>
              </thead>
              <tbody>
                {stepsView?.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 border-t">
                    <td className="px-4 py-2 font-medium"  style={{ color: getRandomHexColor() }}>{entry.user_id}</td>

                    <td className="px-4 py-2">{formatDate(entry.recorded_at)}</td>
                    <td className="px-4 py-2">
                      <StatusCell value={entry.exercise} />
                    </td>
                    <td className="px-4 py-2">
                      <StatusCell value={entry.fruitveg} />
                    </td>
                    <td className="px-4 py-2">
                      <StatusCell value={entry.meals} />
                    </td>
                    <td className="px-4 py-2">
                      <StatusCell value={entry.screentime} />
                    </td>
                    <td className="px-4 py-2">
                      <StatusCell value={entry.sleep} />
                    </td>
                    <td className="px-4 py-2">
                      <StatusCell value={entry.sugary_drinks} />
                    </td>
                    <td className="px-4 py-2">
                      <StatusCell value={entry.treatment} />
                    </td>
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
