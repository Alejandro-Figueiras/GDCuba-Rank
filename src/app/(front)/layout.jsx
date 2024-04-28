import NavBar from '@/components/NavBar/NavBar'

const FrontLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default FrontLayout
