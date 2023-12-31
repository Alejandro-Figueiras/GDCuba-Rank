import { getLevelByID, getLevels } from "@/robtop/getLevel"

export default async() => {

    return (
        <>
            <h1>Comming Soon...</h1>
            <p>{JSON.stringify(await getLevelByID(69010770))}</p>
            <br />
            <p>{JSON.stringify(await getLevels("yatagarasu"))}</p>
        </>
    )
}