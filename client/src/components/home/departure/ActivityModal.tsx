"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IActivity } from "@/common/interfaces/IActivity";

interface ActivityModalProps {
  id: string;
  modalOpened: boolean;
  activities: IActivity[] | undefined;
}

export default function ActivityModal({
  id,
  modalOpened,
  activities,
}: ActivityModalProps) {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  let { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (modalOpened) {
    isOpen = true;
  }

  const handleClick = () => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.delete("activity");
    const newPath = `${path}?${queryParams.toString()}`;

    router.push(newPath);
  };
  const activity: IActivity | undefined = activities?.find(
    (activityI) => activityI.id == id
  );

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={() => {
          handleClick();
          onOpenChange();
        }}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#1F2937]/50 backdrop-opacity-40",
          base: "border-[#1F2937] bg-[#1F2937] dark:bg-[#1F2937] text-[#a8b0d3] shadow-lg drop-shadow-lg",
          header: "border-b-[1px] border-[#1F2937]",
          footer: "border-t-[1px] border-[#1F2937]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {activity?.name}
              </ModalHeader>
              <ModalBody>
                <p>{activity?.description}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={() => {
                    handleClick();
                    isOpen = false;
                  }}
                >
                  Close
                </Button>
                <Button
                  className="bg-secondaryColor/80 shadow-lg shadow-indigo-500/20"
                  onPress={() => {
                    handleClick();
                    isOpen = false;
                  }}
                >
                  Start
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
