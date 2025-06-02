import Modal from '@/components/modal/Modal'
import React from 'react'

export default function ModalQuestionDetails({showModal, setShowModal,selectedQuestion}) {
    console.log("selectedQuestion", selectedQuestion);
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
  

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">{selectedQuestion?.qid}</h2>
        <p className="text-gray-700">This is a modal using Tailwind CSS in React.</p>
        <button
          onClick={() => setShowModal(false)}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </Modal>
    </div>
  )
}
