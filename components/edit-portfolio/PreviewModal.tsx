import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PreviewContent from './PreviewContent';

const PreviewModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.focus();
    }
  }, [isModalOpen]);

  return createPortal(
    <div className="block md:hidden">
      <button
        onClick={openModal}
        className="fixed right-[50px] bottom-[50px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700 z-100"
      >
        Open Modal
      </button>
      <dialog ref={modalRef} open={isModalOpen} onKeyDown={handleKeyDown}>
        <div className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full p-4 z-50">
            {/* Modal content */}
            <div className="modal bg-white rounded-md">
              {/* Modal header */}
              {/* Modal body */}
              <div className="modal-body max-h-[80vh] overflow-y-auto">
                <PreviewContent />
              </div>

              {/* Modal footer */}
              <div className="modal-footer">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div
            onClick={closeModal}
            className="modal-backdrop fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-20"
          ></div>
        </div>
      </dialog>
    </div>,
    document.body
  );
};

export default PreviewModal;
