import TablaUsuarios from "@/components/Admin/TablaUsuarios";
import { getAllUsers } from "@/database/db.users";

export default async () => {
  const usuarios = Object.values(getAllUsers())
  return (
    <div className="component px-8 py-4">
      <h2 className="pt-4 pb-2 text-2xl">Usuarios</h2>
      <TablaUsuarios usuarios={usuarios} />
    </div>
  );
};
