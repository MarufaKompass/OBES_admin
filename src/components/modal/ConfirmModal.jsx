import React from "react";
import Modal from "@/components/modal/Modal";
import { X } from "lucide-react";
import MainButton from "@/components/mainButton/MainButton";

export default function ConfirmModal({
  isOpen,
  onClose,
  title = "Are you sure?",
  message = "Do you really want to perform this action? This process cannot be undone.",
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
   icon = <X size={32}  />,
 iconColor = "#7B1E19",
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">
          {/* Close Button */}
          <div
            onClick={onClose}
            className="text-[#000] cursor-pointer flex justify-end"
          >
            <X size={24} color="#7B1E19"/> 
          </div>

          {/* Icon */}
          <div className="flex justify-center">
            <div
              className={`w-[70px] h-[70px] rounded-full border-4 border-[#7B1E19] flex justify-center items-center `}
             style={{ borderColor: iconColor }}
            >
           {icon}
            </div>
          </div>

          {/* Title & Message */}
          <div className="text-center">
            <h2 className="mt-4 text-h4 text-mainHeading font-heading font-bold ">
              {title}
            </h2>
            <p className="mt-4 text-paragraphFont text-paragraph font-heading">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center mt-5">
            <MainButton variant="outlined" onClick={onClose}>
              {cancelText}
            </MainButton>
            <MainButton variant="primary" onClick={onConfirm}>
              {confirmText}
            </MainButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}
