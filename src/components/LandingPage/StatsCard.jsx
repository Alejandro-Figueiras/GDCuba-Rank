const StatsCard = ({ id, title, value, subtitle, img }) => {
  return <div class="border-1 rounded-xl border-default-500 [background-color:#00000099] p-8 w-96">
    <div class="flex flex-col items-center">
      <img src={img} alt={`Imagen ${id}`} class="h-20"/>
      <p class="text-lg font-semibold">{title}</p>
      <p class="text-2xl font-bold">{value}</p>
      {subtitle && <p className="text-lg font-medium text-default-500">{subtitle}</p>}
    </div>
  </div>
}

export default StatsCard