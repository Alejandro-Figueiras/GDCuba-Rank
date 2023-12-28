import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { PlusIcon } from "../Icons/PlusIcon";
import { routes } from "../../../staticFiles";

export function AccountGDStuff({ dbuser, openModal }) {
    const defaultContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  
    function NoSelectedLevel({ onClick }) {
      return (
        <div className="flex justify-start items-center gap-2">
          <p>Ningun nivel seleccionado</p>
          <Button
            onClick={onClick}
            isIconOnly
            color="primary"
            size="sm"
            className="w-[20px] h-[20px] min-h-0 min-w-0"
          >
            <PlusIcon />
          </Button>
        </div>
      );
    }
  
    return (
      <Accordion variant="shadow">
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Demon mas dificil"
          startContent={<img src={routes.demon.defaultFace} width={30} />}
        >
          {dbuser.harderdemonid == null ? (
            <NoSelectedLevel onClick={() => openModal('harderdemonid', '', 'search')}/>
          ) : (
            <p>{dbuser.harderdemonid}</p>
          )}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="Mejor nivel"
          startContent={<img src={routes.cp} width={30} />}
        >
          {dbuser.bestcreatedlevelid == null ? (
            <NoSelectedLevel />
          ) : (
            <p>{dbuser.bestcreatedlevelid}</p>
          )}
        </AccordionItem>
      </Accordion>
    );
  }