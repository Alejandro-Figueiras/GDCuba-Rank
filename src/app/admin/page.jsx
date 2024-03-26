export default async () => {
	return (
		<div className=' mx-auto p-8 w-full'>
			<header className='text-center'>
				<h1 className='text-2xl font-bold'>Vista general</h1>
				<h2 className='block md:hidden'>Click en menu de la barra de navegación para desplegar las opciones disponibles</h2>
			</header>
			<br />
			{/* <p>Estádistica general</p> */}
			<p>Usuarios Nuevos</p>
			<p>Records Nuevos</p>
			<p>Niveles sin calificar</p>
		</div>
	)
}
