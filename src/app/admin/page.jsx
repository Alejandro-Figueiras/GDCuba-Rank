import AdminRecordsPanel from "@/components/Admin/Records/AdminRecordsPanel"
import AdminUsuariosPanel from "@/components/Admin/Users/AdminUsuariosPanel"

const AdminHome = () => {
	return (
		<div className="py-8">
			<header className='mx-auto w-full text-center px-8'>
				<h1 className='text-2xl font-bold'>Vista general</h1>
				<h2 className='block md:hidden'>Click en el menu de la barra de navegación para desplegar las opciones disponibles</h2>
			</header>
			<br />
			{/* <p>Estádistica general</p> */}
			<AdminUsuariosPanel home/>
			<AdminRecordsPanel home/>
		</div>
	)
}

export default AdminHome