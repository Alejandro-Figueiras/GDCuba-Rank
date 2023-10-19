export const SidebarMenu = ({ title, children }) => {
    return (
      <div className="flex gap-2 flex-col">
        <span className="text-xs font-normal ">{title}</span>
        {children}
      </div>
    );
  };
  