import FrontNavbar from '@/components/Navbar/FrontNavbar'

const FrontLayout = ({
  children
}: {
  children: React.JSX.Element | React.JSX.Element[] | string
}) => {
  return (
    <>
      <FrontNavbar />
      {children}
    </>
  )
}

export default FrontLayout
