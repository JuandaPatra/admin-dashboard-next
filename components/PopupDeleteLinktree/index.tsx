"use client"
import {
    Button,
    Modal,
    Checkbox,
    Label,
    TextInput,
    Select,
    Toast,
    Textarea
  } from "flowbite-react";
  import { useEffect, useState } from "react";
  import { HiOutlineExclamationCircle } from "react-icons/hi";
  import axios from "axios";

interface PopupDeleteLinktree{
    show : boolean
    onClose : () => void,
    id : number
}

export const PopupDeleteLinktree=({ show, onClose, id }:PopupDeleteLinktree)=>{

    const handleDeleteButton = async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault
        try{
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/linktree-template/${id}`)
            onClose()
        }catch(error){
            console.log(error)
        }
    }
    return( 
        <>
      <Modal show={show} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteButton}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={onClose}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        </>
    )
}