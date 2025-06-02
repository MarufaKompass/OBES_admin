import React from 'react'
import { Typography, Button, Input } from "@material-tailwind/react";
export default function TopHeader({
  title,
  buttonLabel = "+ Add New",
  onAddClick,
  showSearch = true,
  searchValue = "",
  onSearchChange,
  placeholder = "Search...",
  buttonIcon, 
  className = "",
}) {
  return (
    <>
      <div className={`w-full mt-10 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 ">
        <Typography variant="h4" color="blue-gray">
          {title}
        </Typography>

        <Button color="blue" onClick={onAddClick} className="flex items-center gap-2">
          {buttonIcon && <span>{buttonIcon}</span>}
          {buttonLabel}
        </Button>
      </div>

      {showSearch && (
        <div className="flex justify-end mb-4">
          <div className="w-full md:w-1/3">
            <Input
              label={placeholder}
              color="blue-gray"
              value={searchValue}
              onChange={onSearchChange}
            />
          </div>
        </div>
      )}
    </div>
    </>
  )
}
