import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card,Typography,Avatar,CardBody} from "@material-tailwind/react";

import UserLoader from '@/components/loader/UserLoader';
import { allUserView } from '@/hooks/ReactQueryHooks';
import TopHeader from '@/components/topHeader/TopHeader';

const TABLE_HEAD = ["Name", "Email", "Phone", "Status", "Role"];

export default function UserLists() {
    const { data: usersView,isLoading } = useQuery({
    queryKey: ['userView'],
    queryFn: allUserView
  });


  return (
    <div >
    <TopHeader
      title="Users & Doctors List"
    />

      {isLoading ? (
       <Card>
        <div>
          <UserLoader></UserLoader>
        </div>
       </Card>
      ) : (
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
              {usersView?.map((user, index) => {
                const isLast = index === usersView?.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={user.id}>
                    <td className={classes}>
                      <div className="flex gap-4">
                        <Avatar
                          src={user?.imgpath}
                          size="sm"
                          alt="images"
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
          </CardBody>
        </Card>
      )}
    </div>
  );
}
