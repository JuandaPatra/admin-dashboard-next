"use client";
import { Layout } from "@/components/Layout";
import React, { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Button  } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import BreadcrumbComponent from "@/components/Breadcrumb";
import PopupLinktree from "@/components/PopupLinktree";
import { LinktreeTable } from "@/components/LinktreeTable";

import { useRouter } from "next/router";
// Tipe untuk elemen yang bisa diseret
interface DragItem {
  type: string;
  name: string;
}
// Tipe konstanta untuk jenis item
const ItemType = {
  BOX: "box",
};

export default function Dashboard() {

  const router = useRouter();
  const { id } = router.query;
  console.log(id)
  useEffect(() => {
  }, [id]);

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  }
  const handleOpenModal = () => {
    setOpenModal(true);
  }
  return (
    <>
      <Layout>
        <PopupLinktree show={openModal} onClose={handleCloseModal} />
        <h1 className="font-semibold text-xl text-center pt-3"> Linktree Page</h1>
        <div className="flex justify-end px-3">
        <Button color="gray" onClick={handleOpenModal}>Add Template</Button>
        </div>
        <LinktreeTable />
      </Layout>
    </>
  );
}
// Draggable Item Component
interface DraggableItemProps {
  name: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ name }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: ItemType.BOX,
    item: { type: ItemType.BOX, name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  drag(ref);

  return (
    <div
      ref={ref}
      className={`w-32 h-16 bg-blue-500 text-white flex items-center justify-center rounded ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {name}
    </div>
  );
};
