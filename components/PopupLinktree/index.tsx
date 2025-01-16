"use client";
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
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
interface PopupLinktreeProps {
    show : boolean,
    onClose : () => void
}
export default function PopupLinktree({ show, onClose }: PopupLinktreeProps) {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
  });
  



  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/linktree-template`, {
        name: formData.name,
        link: formData.link 
      })

      console.log(response)
      onClose()

      if(response.status == 200){
        setFormData({
          name: "",
          link : ""
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange=(e : any)=>{
    const { id, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
  }
  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>Insert Link</Modal.Header>
        <Modal.Body>
          <form
            className="flex max-w-full flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
               <Textarea id="name" value={formData.name} placeholder="Insert name" onChange={handleChange} required rows={4} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="link" />
              </div>
              <TextInput
                id="link"
                type="text"
                required
                value={formData.link}
                onChange={handleChange}
              />
            </div>
            <div>
             
              
            </div>
            
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
