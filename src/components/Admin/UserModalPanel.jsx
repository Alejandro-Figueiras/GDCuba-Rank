import { ModalContext } from "@/app/context/ModalContext";
import { apiRequest } from "@/libs/serverRequest";
import { notify } from "@/libs/toastNotifications";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardBody,
  Skeleton,
  Spinner,
  Accordion,
  AccordionItem,
  CardHeader,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import React, { useContext, useEffect, useId, useRef, useState } from "react";
import config from "../../../config";
import { useGDIconRef } from "@/robtop/iconkit/useGDIcon";
export default function UserModalPanel({
  user,
  isOpen,
  onOpenChange,
  isLoading,
}) {
  function AccountStat({ value, icon = null }) {
    return (
      <div className="flex gap-3 items-center justify-center relative">
        <span className="w-7 h-7 flex items-center justify-center">
          {icon ? (
            <img
              src={icon}
              className="w-100 top-0 left-0"
            />
          ) : (
            "ic"
          )}
        </span>
        <span>{value}</span>
      </div>
    );
  }

  function BodyCard({ children, cardTitle }) {
    return (
      <Card title="Datos" className="h-full">
        <CardHeader>
          <h2 className="text-center w-full">{cardTitle}</h2>
        </CardHeader>
        <CardBody className="flex gap-3 justify-center items-center p-0">
          {children}
        </CardBody>
      </Card>
    );
  }

  function AccountField({ label, value }) {
    return (
      <AccordionItem key="1" aria-label="Accordion 1" title={label}>
        {value}
      </AccordionItem>
    );
  }

  function CardSelect({ items, placeholder, label, onChange, selectedKeys }) {
    return (
      <Select
        items={items}
        label={label}
        placeholder={placeholder}
        className="max-w-xs"
        selectedKeys={selectedKeys}
        onChange={onChange}
      >
        {items.map((item, key) => (
          <SelectItem key={item.key} value={item.key}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    );
  }
  const roles = [
    { key: "user", label: "Usuario" },
    { key: "admin", label: "Moderador" },
  ];
  const status = [
    { key: "v", label: "Verificado" },
    { key: "u", label: "Sin Verificar" },
  ];
  const types = [
    {key: 'creator', label: "Creador"},
    {key:'player', label: "Jugador"},
    {key:'both', label: "Ambos"}
  ]

  const [oldValues, setOldValues] = useState({
    role: user.role,
    status: user.status,
    type: user.status
  });

  const [changes, setChanges] = useState([]);
  const [fields, setFields] = useState({
    role: new Set([]),
    status: new Set([]),
    type: new Set([])
  });

  const { openModal } = useContext(ModalContext);

  const handleSelectionChange = (e, whatChange) => {
    const value = new Set([e.target.value]);
    setFields((prev) => ({ ...prev, [whatChange]: value }));
    if (
      e.target.value != oldValues[whatChange] &&
      !changes.includes(e.target.value)
    ) {
      setChanges((prev) => [...prev, whatChange]);
    } else {
      setChanges((prev) => prev.filter((v) => v != whatChange));
    }
  };

  useEffect(() => {
    setFields({ role: new Set([user.role]), status: new Set([user.status]), type: new Set([user.playerType]) });
    setOldValues({ role: user.role, status: user.status, type: user.playerType });
    setChanges([]);
  }, [user]);

  const handleDelete = (onClose) => {
    openModal({
      title: `Eliminar ${user.username}`,
      desc: `¿Seguro que quieres eliminar a ${user.username}`,
      onSubmit: async () => {
        const apiResult = await apiRequest(
          config.apiURL + `admin/users/remove/${user.username}`
        );

        if (!apiResult.isError()) {
          const success = notify(
            `Usuario ${user.username} eliminado`,
            "success"
          );
          onClose();
        } else {
          const error = notify(`Error al eliminar a ${user.username}`, "error");
          apiResult.show();
        }
      },
      action: "delete",
    });
  };

  function AccountIcon({
    type = 'cube',
    iconNumber = 1,
    c1 = 0,
    c2 = 5,
    glow = false
  }) {
    const { icon } = useGDIconRef({
      type, iconNumber, c1, c2, glow
    })
    return (
      <div className="rounded-md">
        <img ref={icon} alt="Icon" className='h-10' />
      </div>
    )
  }

  // const
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={!isLoading ? "2xl" : ""}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              {user.username}
            </ModalHeader>
            {isLoading ? (
              <div className="p-2 w-full flex justify-center items-center my-6">
                <Spinner />
              </div>
            ) : (
              <>
                <ModalBody>
                  <div className="h-8">
                    <div className="flex justify-between">
                      <AccountStat value={user.stars} icon="/img/star.png"/>
                      <AccountStat value={user.diamonds} icon='/img/diamond.png'/>
                      <AccountStat value={user.secretcoins} icon='/img/secretcoin.png'/>
                      <AccountStat value={user.usercoins} icon='/img/coin.png'/>
                      <AccountStat value={user.demons} icon='/img/demon.png'/>
                      <AccountStat value={user.creatorpoints} icon="/img/cp.png"/>
                    </div>
                  </div>
                  <Card className="bg-default-200">
                    <CardBody className="flex justify-evenly flex-row p-4">
                      <AccountIcon type={"cube"} iconNumber={user.accicon} c1={user.playercolor} c2={user.playercolor2} glow={user.accglow} />
                      <AccountIcon type={"ship"} iconNumber={user.accship} c1={user.playercolor} c2={user.playercolor2} glow={user.accglow} />
                      <AccountIcon type={"ball"} iconNumber={user.accball} c1={user.playercolor} c2={user.playercolor2} glow={user.accglow} />
                      <AccountIcon type={"ufo"} iconNumber={user.accbird} c1={user.playercolor} c2={user.playercolor2} glow={user.accglow} />
                      <AccountIcon type={"wave"} iconNumber={user.accwave} c1={user.playercolor} c2={user.playercolor2} glow={user.accglow} />
                      <AccountIcon type={"robot"} iconNumber={user.accrobot} c1={user.playercolor} c2={user.playercolor2} glow={user.accglow} />
                      <AccountIcon type={"spider"} iconNumber={user.accspider} c1={user.playercolor} c2={user.playercolor2} glow={user.accglow} />
                    </CardBody>
                  </Card>
                  <div className="h-[300px] grid grid-cols-[0.5fr,_1fr] gap-2">
                    {/* grid grid-cols-[0.5fr,_1fr] gap-2 */}
                    <div>
                      <Card classNames={{base: "mb-2"}}>
                        <CardHeader className="text-small justify-between">
                          <b>ID</b>
                          <p>{user.accountid}</p>
                        </CardHeader>
                      </Card>

                      <Card classNames={{base: "mb-2"}}>
                        <CardHeader className="text-small justify-between">
                          <b>Teléfono</b>
                          <p>{user.phone}</p>
                        </CardHeader>
                      </Card>
                    </div>
                    <BodyCard cardTitle={"Datos y Permisos"}>
                      <CardSelect
                        items={roles}
                        label={"Nivel"}
                        selectedKeys={fields.role}
                        onChange={(e) => handleSelectionChange(e, "role")}
                      />
                      <CardSelect
                        items={status}
                        label={"Estado de la cuenta"}
                        selectedKeys={fields.status}
                        onChange={(e) => handleSelectionChange(e, "status")}
                      />
                      {/* <CardSelect
                        items={types}
                        label={"Tipo de cuenta"}
                        selectedKeys={fields.type}
                        onChange={(e) => handleSelectionChange(e, "types")}
                      /> */}
                    </BodyCard>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={onClose}
                    isDisabled={changes.length == 0}
                  >
                    Actualizar
                  </Button>
                  <Button color="danger" onClick={() => handleDelete(onClose)}>
                    Eliminar
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
