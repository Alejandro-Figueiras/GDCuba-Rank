import { NavbarItem, NavbarMenuItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = ({ href, children }) => {
  const rutaActual = usePathname();

  return (
    <NavbarItem isActive={rutaActual == href}>
      <Link href={href} color={rutaActual == href ? "primary" : "foreground"}>
        {children}
      </Link>
    </NavbarItem>
  );
};

export const NavMenuLink = ({ href, children, fontSize }) => {
  const rutaActual = usePathname();


  return (
    <NavbarMenuItem isActive={rutaActual == href}>
      <Link
        href={href}
        color="primary"
        className={`w-full ${fontSize || "text-2xl"}`}
      >
        {children}
      </Link>
    </NavbarMenuItem>
  );
};
