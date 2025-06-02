import React from 'react'
import { Typography, Button, Input } from "@material-tailwind/react";
export default function Title({
  title,
  className = "",
}) {
  return (
    <>
      <div className={`w-full mt-10 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Typography variant="h4" color="blue-gray">
          {title}
        </Typography>
      </div>
    </div>
    </>
  )
}
