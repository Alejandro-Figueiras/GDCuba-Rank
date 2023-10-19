

import getSong from "@/app/api/getSong";
import { testUserChange, testUserQuery } from "@/database/db.devFunctions";
import pilotocss from "./piloto.module.css"
import { getAccount } from "@/app/api/getAccount";

export default async() => {
    const song = await getSong(693041);
    await testUserChange()
    let testUser;
    testUser = await testUserQuery()
    testUser = (testUser != -1)?testUser.rows[0] : {error: 'too many connections for role in db'}

    let user = await getAccount("SrMDK");
    return (
        <div className={pilotocss.piloto}>
            <h1 className="text-4xl pb-2">GD Cuba ΔΔΔ: Prueba de Backend</h1>
            <hr className="pb-4"/>
            
            <h2 className="text-2xl pb-2">Integración con los servers de Robtop</h2>
            <p className="pb-4">{JSON.stringify(song)}</p>
            <p className="pb-4">{JSON.stringify(user)}</p>
        
            <h2 className="text-2xl pb-2">Integración con la base de datos</h2>
            <p className="pb-4">{JSON.stringify(testUser)}</p>
        </div>
    )
}