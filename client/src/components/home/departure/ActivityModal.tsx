"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IActivity } from "@/common/interfaces/IActivity";
import { FaClock, FaMapMarkedAlt } from "react-icons/fa";
import { MdAddLocationAlt, MdCategory } from "react-icons/md";
import ReviewsCard from "./ActivityModal/ReviewsCard";

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
        size="2xl"
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#1F2937]/50 backdrop-opacity-40",
          base: "border-[#1F2937] bg-[#1F2937] dark:bg-[#1F2937] text-[#a8b0d3] shadow-lg drop-shadow-lg border-2 border-gray-700",
          header: "border-b-[1px] border-[#1F2937]",
          footer: "border-t-[1px] border-[#1F2937]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex justify-center">
                  <div className="bg-secondaryColor rounded-lg">
                    <FaMapMarkedAlt className="w-40 h-40 p-4 text-white" />
                  </div>
                </div>
                <div className="flex justify-center text-white text-xl">
                  {activity?.name}
                </div>
                <p>{activity?.description}</p>
                <p className="flex flex-col space-y-2">
                  <span className="text-gray-300 font-semibold flex items-center">
                    <MdCategory className="mr-2 w-6 h-6 bg-secondaryColor rounded-full text-gray-700 p-0.5" />
                    Category:{" "}
                    <span className=" text-gray-400 ml-2 font-normal">
                      {activity?.category}
                    </span>
                  </span>
                  <span className="text-gray-300 font-semibold flex items-center">
                    <MdAddLocationAlt className="mr-2 w-6 h-6 bg-secondaryColor rounded-full text-gray-700 p-0.5" />
                    Address:{" "}
                    <span className=" text-gray-400 ml-2 font-normal">
                      {activity?.address}
                    </span>
                  </span>
                  <span className="text-gray-300 font-semibold flex items-center">
                    <FaClock className="mr-2 w-6 h-6 bg-secondaryColor rounded-full text-gray-700 p-0.5" />
                    Duration:{" "}
                    <span className=" text-gray-400 ml-2 font-normal">
                      {activity?.duration}
                    </span>
                  </span>
                </p>
                <ReviewsCard activity={activity} />
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
                  className="bg-secondaryColor/80 shadow-lg shadow-indigo-500/20 flex items-center"
                  onPress={() => {
                    handleClick();
                    isOpen = false;
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="#EDF3F0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z"
                      fill="#EDF3F0"
                    />
                  </svg>
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
