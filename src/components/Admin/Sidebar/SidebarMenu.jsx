export const SidebarMenu = ({ title, children }) => {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-xs font-normal '>{title}</span>
      {children}
    </div>
  )
}
