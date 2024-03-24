const StatsCard = ({ id, title, value, img }) => {
  return <div class="b border-1 rounded-md border-default-500 [background-color:#00000099] p-8 w-96">
    <div class="flex flex-col items-center">
      <img src={img} alt={`Imagen ${id}`} class="w-42"/>
      <p class="text-lg font-semibold">{title}</p>
      <p class="text-2xl font-bold">{value}</p>
    </div>
  </div>
}

export default StatsCard