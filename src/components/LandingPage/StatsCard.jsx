const StatsCard = ({ id, title, value, subtitle, img }) => {
  return <div className="border-1 rounded-xl border-default-500 [background-color:#00000099] p-8 w-96">
    <div className="flex flex-col items-center">
      <img src={img} alt={`Imagen ${id}`} className="h-20"/>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
      {subtitle && <p className="text-lg font-medium text-default-500">{subtitle}</p>}
    </div>
  </div>
}

export default StatsCard