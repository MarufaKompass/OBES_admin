import React from 'react'
import Skeleton from './Skeleton'
export default function UserLoader() {
  return (

    <div className="container mx-auto px-4 py-4">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="p-3"><Skeleton className="h-3 w-24" /></th>
          <th className="p-3"><Skeleton className="h-3 w-24" /></th>
          <th className="p-3"><Skeleton className="h-3 w-24" /></th>
          <th className="p-3"><Skeleton className="h-3 w-24" /></th>
          <th className="p-3"><Skeleton className="h-3 w-24" /></th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index}>
            <td className="p-3 flex gap-4 items-center"><Skeleton className="h-10 w-10 rounded-[100%]" /><Skeleton className="h-4 w-32 flex items-center" /></td>
            <td className="p-3"><Skeleton className="h-4 w-40" /></td>
            <td className="p-3"><Skeleton className="h-4 w-28" /></td>
            <td className="p-3"><Skeleton className="h-4 w-20" /></td>
            <td className="p-3"><Skeleton className="h-4 w-24" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  )
}
