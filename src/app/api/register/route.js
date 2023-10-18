import { addUser, secureQuery } from "@/database/db.functions";
import { NextResponse } from "next/server"

export const POST = async(req) => {
    const data = await req.json();
    const fields = {user: data.username, password: data.password, phone: data.phone};
    // console.log("data: ", fields);
    const query = await addUser(fields);

    if (!query.isError()) {
        return NextResponse.json({message: 'Usuario creado satisfactoriamente'}, {
            status: 200
        })
    }
    return NextResponse.json({error: 'Ha ocrrido un error'}, {
        status: 500
    })
    
}