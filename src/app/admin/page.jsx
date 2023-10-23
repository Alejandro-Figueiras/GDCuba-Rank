import { getLevelByID, getLevels } from "@/robtop/getLevel"

export default async() => {
    const resultados = await getLevelByID(65227464);
    console.log(resultados)
    return (
        <>
            <h1>Comming Soon...</h1>
            {/* TODO */}
        </>
    )
}