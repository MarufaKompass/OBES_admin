import axiosInstance from '@/axiosInstance/axios.config';
import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Avatar,
  Spinner,
} from "@material-tailwind/react";
import UserLoader from '@/components/loader/UserLoader';

const TABLE_HEAD = ["Name", "Email", "Phone", "Status", "Role"];

export default function UserLists() {
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const users = userLists?.data || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("https://obapi.myhealthrow.com/public/api/userx");
        setUserLists(res.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <Typography variant="h3" className="mb-8">User Info</Typography>

      {loading ? (
       <Card>
        <div>
          <UserLoader></UserLoader>
        </div>
       </Card>
      ) : (
        <Card className="h-full w-full overflow-scroll">
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
              {users.map((user, index) => {
                const isLast = index === users.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={user.id}>
                    <td className={classes}>
                      <div className="flex gap-4">
                        <Avatar
                          src="https://docs.material-tailwind.com/img/face-2.jpg"
                          size="sm"
                          alt="avatar"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal flex items-center"
                        >
                          {user.fulname}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.logemail}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.logmobile}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.status}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="white"
                        className="font-medium border flex justify-center py-2 bg-primaryBg"
                      >
                        {user.role.toUpperCase()}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
