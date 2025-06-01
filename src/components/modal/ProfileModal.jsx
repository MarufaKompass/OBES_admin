import React from 'react'
import { Mail, Phone, Calendar, Shield, Clock, MapPin, User } from "lucide-react"


export default function ProfileModal({ isOpen, onClose, userprofile }) {
  if (!isOpen) return null;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const formatDateOfBirth = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "user":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-10 text-gray-500 hover:text-red-500 text-2xl"
        >
          ×
        </button>

        {/* Profile Info */}
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold mb-2 text-[#333] ">User Profile</h2>
        
          {/* Header */}
          <div className="bg-white border rounded p-4 flex items-center gap-4">
            <img
              src={`/${userprofile?.imgpath}`}
              alt={userprofile?.fulname}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#333]">{userprofile?.fulname}</h3>
              <p className="text-sm text-gray-500">ID: {userprofile?.id}</p>
              <div className="flex gap-2 mt-2 text-xs">
                <span className={`px-2 py-1 rounded flex items-center gap-1 ${getRoleColor(userprofile?.role)}`}>
                  <Shield className="w-3 h-3" />
                  {userprofile?.role}
                </span>
                <span className={`px-2 py-1 rounded ${getStatusColor(userprofile?.status)}`}>
                  {userprofile?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border rounded p-4">
            <h4 className="flex items-center gap-2 text-lg font-semibold mb-4 text-[#333]">
              <Mail className="w-5 h-5" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-500">Email</p>
                <div className="flex items-center  gap-2 text-gray-500">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {userprofile?.logemail}
                </div>
                  {!userprofile?.email_verified_at && (
                    <span className="ml-6 px-2 py-0.5 border rounded text-xs text-[#333] font-[700]">Unverified</span>
                  )}
              </div>
              <div>
                <p className="font-medium text-gray-500">Mobile</p>
                <div className="flex items-center gap-2 text-gray-500">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {userprofile?.logmobile}
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-500">SMS Mobile</p>
                <div className="flex items-center gap-2 text-gray-500">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {userprofile?.smsmobile}
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-500">Country Code</p>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  +{userprofile?.ccode}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="border rounded p-4">
            <h4 className="flex items-center gap-2 text-lg font-semibold mb-4 text-[#333]">
              <User className="w-5 h-5" />
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-500">Gender</p>
                <p className="capitalize text-gray-500">{userprofile?.ogender}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Date of Birth</p>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {formatDateOfBirth(userprofile?.dob)}
                </div>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="border rounded p-4">
            <h4 className="flex items-center gap-2 text-lg font-semibold mb-4 text-[#333]">
              <Clock className="w-5 h-5" />
              System Information
            </h4>
            <div className="text-sm space-y-4">
              <div>
                <p className="font-medium text-gray-500">Account Created</p>
                <p className='text-gray-500'>{formatDate(userprofile?.created_at)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Last Updated</p>
                <p className='text-gray-500'>{formatDate(userprofile?.updated_at)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Email Verification</p>
                <p className='text-deep-orange-700'>
                  {userprofile?.email_verified_at
                    ? formatDate(userData.email_verified_at)
                    : "Not verified"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
