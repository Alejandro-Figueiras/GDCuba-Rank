import NavBar from "@/components/NavBar/NavBar"

export default ({children}) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}