const StatsCard = ({ id, title, value, subtitle, img }) => {
  return (
    <div className='w-96 rounded-xl border-1 border-default-500 p-8 [background-color:#00000099]'>
      <div className='flex flex-col items-center'>
        <img src={img} alt={`Imagen ${id}`} className='h-20' />
        <p className='text-lg font-semibold'>{title}</p>
        <p className='text-2xl font-bold'>{value}</p>
        {subtitle && (
          <p className='text-lg font-medium text-default-500'>{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export default StatsCard
