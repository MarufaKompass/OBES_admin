import Modal from '@/components/modal/Modal'
import React, { useState } from 'react'
import { Heart, Info, X } from "lucide-react"
export default function ModalQuestionDetails({ showModal, setShowModal, selectedQuestion }) {
  const [language, setLanguage] = useState("en")

  const currentQuestion = language === "en" ? selectedQuestion?.qeng : selectedQuestion?.qbang
  const currentOptions = language === "en" ? selectedQuestion?.qaoptioneng : selectedQuestion?.qaoptionbng
  const currentCategory = language === "en" ? selectedQuestion?.category : selectedQuestion?.category_bangla

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  <Heart className="h-3 w-3 mr-1" />
                  {currentCategory}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 rounded text-sm border ${language === "en"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300"
                      }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("bn")}
                    className={`px-3 py-1 rounded text-sm border ${language === "bn"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300"
                      }`}
                  >
                    বাং
                  </button>
                  <div
                    onClick={() => setShowModal(false)}
                    className=" text-[#000] ml-2 cursor-pointer"
                  >
                    <X size={32} />
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">{currentQuestion}</h2>

              <p className="flex items-center text-sm text-gray-600">
                <Info className="mr-2 h-4 w-4" />
                Question ID: {selectedQuestion?.qid} | Type: {selectedQuestion?.qatype} | Status: {selectedQuestion?.qstatus}
              </p>
            </div>

            {/* Body */}
            <div className="py-4">
              {
                Array.isArray(currentOptions) && currentOptions.length > 0 && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Consequences of Obesity:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentOptions?.map((option, index) => (
                        <li key={index} className="text-sm text-gray-700">{option} || []</li>
                      ))}
                    </ul>
                  </div>
                )
              }


              <div className="text-xs text-gray-500 space-y-1">
                <p>Created by: {selectedQuestion?.qby}</p>
                <p>Created at: {new Date(selectedQuestion?.created_at).toLocaleString()}</p>
                <p>Updated at: {new Date(selectedQuestion?.updated_at).toLocaleString()}</p>
              </div>
            </div>

            {/* Footer */}


          </div>
        </div>
      </Modal>
    </div>
  )
}
