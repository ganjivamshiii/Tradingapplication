import React from 'react'

const Modal = ({isOpen , onClose, title, children}) => {
    if(!isOpen) return null;
  return (
    <div className="fixed insert-0 z-50 overflow-y-auto">

        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pd-20 text-center sm:p-0">
            <div className=" fixed insert-0 transition-opacity bg-gray-500 bg-opacity-75"
            onClick={onClose}></div>
<div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
    <div className="absolute top-0 right-0 pt-4 pr-4">
        <button onClick={onClose}
        className="text-gray-400 hover:text-gray-500"
        >
        <span className="text-2xl">&times;</span>
        </button>

                    </div>
                        {title && (
                    <h3 className="text-llg font-medium leading-6 text-gray-900 mb-4">{title}</h3>
                   )}
                <div className="mt-2">
            </div>
          </div>
        </div>
    </div>
  )
}

export default Modal