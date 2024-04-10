import { ModalContext } from "@/app/context/ModalContext";
import { notify } from "@/libs/toastNotifications";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";

import BodyCard from "./BodyCard";
import CardSelect from "./CardSelect";
import AccountStatsRow from "./AccountStatsRow";
import AccountIconsRow from "./AccountIconsRow";
import AccountInfoColumn from "./AccountInfoColumn";
import { roles, status } from "./selectKeys";
import { validateUserAction } from "@/actions/admin/validateUserAction";
import { removeUserAction } from "@/actions/admin/removeUserAction";
import { banUser } from "@/database/db.users";
import { useSesion } from "@/hooks/useSesion";
import { changeUserRoleAction } from "@/actions/admin/changeUserRoleAction";

export default function UserModalPanel({
  user,
  isOpen,
  onOpenChange,
  isLoading,
}) {
  const { currentUser } = useSesion();
  const [loadingExtra, setLoadingExtra] = useState(false)

  const [oldValues, setOldValues] = useState({
    role: user.role,
    status: user.status,
  });
  
  const [changes, setChanges] = useState([]);
  const [fields, setFields] = useState({
    role: new Set([]),
    status: new Set([]),
  });
  
  const { openModal } = useContext(ModalContext);

  const handleSelectionChange = (e, whatChange) => {
    if (e.target.value == '') return;
    
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
    setLoadingExtra(false)
    setFields({ role: new Set([user.role]), status: new Set([user.status]), type: new Set([user.playerType]) });
    setOldValues({ role: user.role, status: user.status, type: user.playerType });
    setChanges([]);
  }, [user]);
  
  const handleDelete = (onClose) => {
    openModal({
      title: `Eliminar ${user.username}`,
      desc: `¿Seguro que quieres eliminar a ${user.username}`,
      onSubmit: async () => {
        const result = JSON.parse(await removeUserAction({username: user.username}))
        
        if (result) {
          const success = notify(
            `Usuario ${user.username} eliminado`,
            "success"
          );
          onClose();
        } else {
          const error = notify(`Error al eliminar a ${user.username}`, "error");
          onClose();
        }

        if (user.updateData) user.updateData()
      },
      action: "delete",
    });
  };

  const handleUpdate = async(e) => {
    for (const change of changes) {
      if (change == 'status') {
        // TODO authorize in action
        if (fields[change].has('b')) {
          await banUser({user: user.username})
        } else if (fields[change].has('v')) {
          await validateUserAction({user: user.username})
        } else {
          await validateUserAction({user: user.username, unvalidate: true})
        }
      } else if (change == 'role' && currentUser.role == "owner") {
        const role = 
          fields.role.has('owner') ? 'owner'
          : fields.role.has('admin') ? 'admin'
          : 'user'
        await changeUserRoleAction({user: user.username, role})
      }
    }
    if (user.updateData) user.updateData()
  }

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
            {isLoading || loadingExtra ? (
              <div className="p-2 w-full flex flex-col h-10 justify-center items-center my-6">
                <Spinner />
              </div>
            ) : (
              <>
                <ModalBody>
                  <AccountStatsRow user={user} />
                  <AccountIconsRow user={user} />
                  <div className="h-[300px] grid grid-cols-[0.5fr,_1fr] gap-2">
                    {/* grid grid-cols-[0.5fr,_1fr] gap-2 */}
                    <AccountInfoColumn user={user} />
                    <BodyCard cardTitle={"Datos y Permisos"}>
                      <CardSelect
                        items={roles}
                        label={"Nivel"}
                        selectedKeys={fields.role}
                        onChange={(e) => handleSelectionChange(e, "role")}
                        isDisabled={(currentUser.role != "owner")}
                      />
                      <CardSelect
                        items={status}
                        label={"Estado"}
                        selectedKeys={fields.status}
                        onChange={(e) => handleSelectionChange(e, "status")}
                        isDisabled={(user.role != "user" && currentUser.role != 'owner')}
                      />
                    </BodyCard>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={async(e) => {
                      setLoadingExtra(true)
                      await handleUpdate()
                      onClose()
                    }}
                    isDisabled={changes.length == 0}
                  >
                    Actualizar
                  </Button>
                  {/* TODO delete cooldown */}
                  {(user.role == 'user' || currentUser.role == 'owner') && <Button color="danger" onClick={() => handleDelete(onClose)}>
                    Eliminar
                  </Button>}
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
