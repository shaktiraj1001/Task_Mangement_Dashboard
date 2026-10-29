import { useState } from 'react'
import Modal from './Modal'

const ConfirmDialog = ({ title, message, confirmLabel = 'Delete', onConfirm, onCancel }) => {
  const [busy, setBusy] = useState(false)

  const confirmHandler = async () => {
    setBusy(true)
    await onConfirm()     
    setBusy(false)
  }

  return (
    <Modal title={title} onClose={onCancel}>
      <p className='text-sm text-slate-600'>{message}</p>
      <div className='mt-6 flex justify-end gap-3'>
        <button onClick={onCancel} className='rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100'>
          Cancel
        </button>
        <button onClick={confirmHandler} disabled={busy} className='rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50'>
          {busy ? 'Please wait...' : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
