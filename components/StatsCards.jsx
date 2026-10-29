const StatsCards = ({ todos }) => {
  const total = todos.length
  const completed = todos.filter((t) => t.completed).length
  const pending = total - completed
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  const cards = [
    { label: 'Total Tasks', value: total, color: 'text-slate-800' },
    { label: 'Completed', value: completed, color: 'text-emerald-600' },
    { label: 'Pending', value: pending, color: 'text-amber-600' },
  ]

  return (
    <div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {cards.map((card) => (
          <div key={card.label} className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
            <p className='text-sm text-slate-500'>{card.label}</p>
            <p className={`mt-1 text-3xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {}
      <div className='mt-4'>
        <div className='mb-1 flex justify-between text-xs text-slate-500'>
          <span>Progress</span>
          <span>{percent}% complete</span>
        </div>
        <div className='h-2 w-full overflow-hidden rounded-full bg-slate-200'>
          <div className='h-full bg-emerald-500 transition-all' style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  )
}

export default StatsCards
