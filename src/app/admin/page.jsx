import getSong from "@/robtop/getSong"

export default async() => {

    return (
        <>
            <h1>Comming Soon...</h1>
            {/* {JSON.stringify(song)} */}
            <p>{JSON.stringify(await getSong(810139))}</p>
        </>
    )
}