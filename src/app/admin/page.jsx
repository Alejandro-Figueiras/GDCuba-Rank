import { getAllLevelKeys, getLevel } from "@/database/db.levels"
import { getLevelByID, getLevels } from "@/robtop/getLevel"

export default async() => {
    await getAllLevelKeys();
    return (
        <>
            <h1>Comming Soon...</h1>
            {/* <p>{JSON.stringify(await getLevelByID(69010770))}</p> */}
            <br />
            <p>{JSON.stringify(await getLevel({levelID: 69010770}))}</p>
        </>
    )
}