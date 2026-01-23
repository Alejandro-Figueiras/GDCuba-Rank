const StatsCard = ({
  id,
  title,
  value,
  subtitle,
  img
}: {
  id: string
  title: string
  value: string | number
  subtitle?: string
  img: string
}) => {
  return (
    <div className='border-default-500 w-96 rounded-xl border bg-[#00000099] p-8'>
      <div className='flex flex-col items-center'>
        <img src={img} alt={`Imagen ${id}`} className='h-20' />
        <p className='text-lg font-semibold'>{title}</p>
        <p className='text-2xl font-bold'>{value}</p>
        {subtitle && (
          <p className='text-default-500 text-lg font-medium'>{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export default StatsCard
