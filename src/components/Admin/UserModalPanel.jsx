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
export default function UserModalPanel({
  user,
  isOpen,
  onOpenChange,
  isLoading,
}) {
  function AccountStat({ value, icon = null }) {
    return (
      <div className="flex gap-3 items-center justify-center relative">
        <span className="bg-default-300 w-5 h-5 flex items-center justify-center p-2">
          {icon ? (
            <img
              src={icon}
              className="object-cover w-full absolute top-0 left-0"
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

  function AccountIcon({href = null}) {
    return <div className="h-10 aspect-[1/1] bg-slate-200 rounded-md">
    </div>
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
                      <AccountStat value={user.stars} />
                      <AccountStat value={user.diamonds} />
                      <AccountStat value={user.secretCoins} />
                      <AccountStat value={user.usercoins} />
                      <AccountStat value={user.demons} />
                      <AccountStat value={user.creatorpoints} />
                    </div>
                  </div>
                  <Card className="bg-default-200">
                    <CardBody className="flex justify-evenly flex-row p-4">
                      <AccountIcon/>
                      <AccountIcon/>
                      <AccountIcon/>
                      <AccountIcon/>
                      <AccountIcon/>
                      <AccountIcon/>
                      <AccountIcon/>
                    </CardBody>
                  </Card>
                  <div className="h-[300px] grid grid-cols-[0.5fr,_1fr] gap-2">
                    {/* grid grid-cols-[0.5fr,_1fr] gap-2 */}
                    <BodyCard cardTitle={"Detalles"}>
                      <Accordion variant="splitted" className="text-[12px]">
                        <AccordionItem
                          key="1"
                          aria-label="CuentaID"
                          title={
                            <Tooltip
                              showArrow={true}
                              content={`ID de ${user.username} en los Servidores de GD`}
                            >
                              <p className="text-sm">ID</p>
                            </Tooltip>
                          }
                        >
                          {user.accountID}
                        </AccordionItem>
                        <AccordionItem
                          key="2"
                          aria-label="Telefono"
                          label="Telefono"
                          title={
                            <Tooltip
                              showArrow={true}
                              content={`Telefono asociado a su cuenta en GDQW`}
                            >
                              <p className="text-sm">Telefono</p>
                            </Tooltip>
                          }
                        >
                          {user.phone}
                        </AccordionItem>

                        <AccordionItem
                          key="3"
                          aria-label="Fecha de inicio"
                          title={
                            <Tooltip
                              showArrow={true}
                              content={`Cuando ${user.username} se unió a GDQW`}
                            >
                              <p className="text-sm">Fecha de cuenta</p>
                            </Tooltip>
                          }
                        >
                          {user.phone}
                        </AccordionItem>
                      </Accordion>
                    </BodyCard>
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
                      <CardSelect
                        items={types}
                        label={"Tipo de cuenta"}
                        selectedKeys={fields.type}
                        onChange={(e) => handleSelectionChange(e, "types")}
                      />
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
