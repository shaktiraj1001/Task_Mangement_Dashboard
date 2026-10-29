const Toolbar = ({ search, onSearch, filter, onFilter, sort, onSort, onAdd }) => {
  const box = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500'

  return (
    <div className='flex flex-col gap-3 md:flex-row md:items-center'>
      <input
        type='text'
        placeholder='Search tasks...'
        className={`${box} md:flex-1`}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select className={box} value={filter} onChange={(e) => onFilter(e.target.value)}>
        <option value='all'>All tasks</option>
        <option value='completed'>Completed</option>
        <option value='pending'>Pending</option>
      </select>

      <select className={box} value={sort} onChange={(e) => onSort(e.target.value)}>
        <option value='id-desc'>ID: High to Low</option>
        <option value='id-asc'>ID: Low to High</option>
        <option value='title-asc'>Title: A to Z</option>
        <option value='title-desc'>Title: Z to A</option>
      </select>

      <button onClick={onAdd} className='rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-95'>
        + Add Task
      </button>
    </div>
  )
}

export default Toolbar
