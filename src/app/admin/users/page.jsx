import TablaUsuarios from "@/components/Admin/TablaUsuarios";
import { getUsers } from "@/database/db.functions"

export default async() => {
    const usuarios = (await getUsers("all")).rows;
    console.log(usuarios)
    return (
        <div className="component px-8 py-4">
            <h2>Usuarios No Verificados</h2>
            <p>asdasdasda</p>
            <hr />
            <h2 className="pt-4 pb-2 text-2xl">Usuarios</h2>
            <TablaUsuarios usuarios={usuarios} />
        </div>
    );
}