const Pagination = ({ page, totalPages, totalItems, pageSize, onPageChange }) => {
  if (totalItems === 0) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)

  let start = Math.max(1, page - 2)
  const end = Math.min(totalPages, start + 4)
  start = Math.max(1, end - 4)
  const numbers = []
  for (let n = start; n <= end; n++) numbers.push(n)

  const btn = 'rounded-lg border px-3 py-1.5 text-sm'

  return (
    <div className='mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row'>
      <p className='text-sm text-slate-500'>Showing {from}-{to} of {totalItems}</p>

      <div className='flex flex-wrap items-center gap-2'>
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}
          className={`${btn} border-slate-300 bg-white disabled:cursor-not-allowed disabled:opacity-40`}>
          Prev
        </button>

        {numbers.map((n) => (
          <button key={n} onClick={() => onPageChange(n)}
            className={`${btn} ${n === page ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white hover:bg-slate-100'}`}>
            {n}
          </button>
        ))}

        <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}
          className={`${btn} border-slate-300 bg-white disabled:cursor-not-allowed disabled:opacity-40`}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
