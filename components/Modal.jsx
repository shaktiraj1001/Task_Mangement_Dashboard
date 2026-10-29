const Modal = ({ title, onClose, children }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4' onClick={onClose}>
      {}
      <div className='w-full max-w-md rounded-xl bg-white p-6 shadow-xl' onClick={(e) => e.stopPropagation()}>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-slate-800'>{title}</h2>
          <button onClick={onClose} aria-label='Close' className='text-2xl leading-none text-slate-400 hover:text-slate-600'>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
