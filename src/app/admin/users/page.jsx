import TablaUsuarios from "@/components/Admin/TablaUsuarios";
import TablaUsuariosNoVerificados from "@/components/Admin/TablaUsuariosNoVerificados";
import { getUsersCloud } from "@/database/cloud/db.functions";

export default async () => {
  const usuarios = (await getUsersCloud("all")).rows;
  return (
    <div className="component px-8 py-4">
      {/* <h2 className="pt-4 pb-2 text-2xl">Usuarios No Verificados</h2>
            <TablaUsuariosNoVerificados usuarios={usuariosNV}/>
            <hr /> */}
      <h2 className="pt-4 pb-2 text-2xl">Usuarios</h2>
      <TablaUsuarios usuarios={usuarios} />
    </div>
  );
};
