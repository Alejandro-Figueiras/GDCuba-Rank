import { Accordion, AccordionItem } from "@nextui-org/react";
import { NavMenuLink } from "./NavbarLinks";
import { routes } from "../../../staticFiles";
import { usePathname } from "next/navigation";

export const ResponsiveRankNav = ({onLinkSelected}) => {
    const MenuItem = ({ href, imgRoute, label }) => {
      const route = usePathname();
      return (
        <NavMenuLink href={href} fontSize={"text-lg"}>
          <div className={`flex gap-2 justify-start items-center mb-5 ${href == route && "text-cyan-600"}`} onClick={onLinkSelected}>
            <span className="left-10">
              <img src={imgRoute} width={"22"} alt={label} />
            </span>
            {label}
          </div>
        </NavMenuLink>
      );
    };
    return (
      <Accordion aria-label="Rank" className="px-0">
        <AccordionItem
          key="1"
          title="Rankings"
          subtitle="Presiona para ver los ranking disponibles"
          classNames={{
            title: "text-2xl",
            // indicator: "absolute left-[100px] ",
          }}
        >
          <MenuItem
            href={'/rank/stars'}
            imgRoute={routes.stars}
            label={"Estrellas"}
          />
          <MenuItem
            href={'/rank/demons'}
            imgRoute={routes.demon.defaultFace}
            label={"Demons"}
          />
          <MenuItem
            href={'/rank/moons'}
            imgRoute={routes.moons}
            label={"Lunas"}
          />
          <MenuItem
            href={'/rank/usercoins'}
            imgRoute={routes.userCoins}
            label={"User coins"}
          />
          <MenuItem
            href={'/rank/cp'}
            imgRoute={routes.cp}
            label={"Creator points"}
          />
        </AccordionItem>
      </Accordion>
    );
  };
