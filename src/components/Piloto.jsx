import getSong from "@/api/getSong";
import { testUserQuery } from "@/database/db.devFunctions";

export default async() => {
    const song = await getSong(693041);
    let testUser;
    testUser = await testUserQuery()
    console.log(testUser)
    testUser = (testUser != -1)?testUser.rows[0] : {error: 'too many connections for role in db'}
    return (
        <>
            <h1 className="text-4xl">GD Cuba ΔΔΔ: Prueba de Backend</h1>
            <hr/>
            
            <h2>Integración con los servers de Robtop</h2>
            <p>{JSON.stringify(song)}</p>
        
            <h2>Integración con la base de datos</h2>
            <p>{JSON.stringify(testUser)}</p>
        </>
    )
}