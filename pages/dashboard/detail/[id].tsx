import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "@/components/Layout";
import {
  Button,
  Label,
  TextInput,
} from "flowbite-react";

import { notFound, redirect } from 'next/navigation';
interface Template{
  name : string;
  link : string;
  sosmed : number[]
}

interface Sosmed{
  id : number;
  source_id : number;
}
const DetailPage = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = query;
  

  const [formData, setFormData] = useState<Template >({
    name: "",
    link: "",
    sosmed : []
  });


  useEffect(()=>{
    if(id){
      fetchData()
    }
  }, [id])

  const fetchData=async ()=>{
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/linktree-template/${id}`)
      const sosmedIds = response.data.sosmed.map((item: Sosmed) => item.source_id);
      setFormData((prev) => {
        const isSame =
          prev.name === response.data.data.name &&
          prev.link === response.data.data.link &&
          JSON.stringify(prev.sosmed) === JSON.stringify(sosmedIds);

        if (isSame) return prev;

        return {
          name: response.data.data.name,
          link: response.data.data.link,
          sosmed: sosmedIds,
        };
      });
    } catch (error) {
      console.log(error)
       redirect('/dashboard')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/link-dashboard/${id}`,
        {
         show_lead_name: formData.name,
         show_lead_link: formData.link,
         source_names: formData.sosmed
        }
      );

      console.log(response);

      if (response.status == 200) {
        setFormData({
          name: "",
          link: "",
          sosmed : []
        });
      }
    } catch (error) {
      console.log(error);
    
    }
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (sourceId: number) => {
    setFormData((prev) => {
      const isChecked = prev.sosmed.includes(sourceId);

      const updatedSosmed = isChecked
        ? prev.sosmed.filter((id) => id !== sourceId) // Remove ID if checked
        : [...prev.sosmed, sourceId]; // Add ID if unchecked

      return { ...prev, sosmed: updatedSosmed };
    });
  };
  return (
    <div>
      <Layout>
        <div className="m-4">
          <div className="p-10 h-[60vh] w-[80%] bg-gray-100 rounded-xl">
            <h1 className=" text-xl font-bold">Detail {}</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" className="font-semibold" />
                </div>
                <TextInput
                  id="name"
                  className=" text-lg"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="link" value="Link" className="font-semibold" />
                </div>
                <TextInput
                  id="link"
                  className=""
                  type="text"
                  required
                  value={formData.link}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    checked={formData.sosmed.includes(1)}
                    onChange={() => handleCheckboxChange(1)}
                    id="checked-checkbox"
                    type="checkbox"
                    value={1}
                    className="w-4 h-4 text-cyan-800 bg-gray-100 border-gray-300 rounded focus:text-cyan-800 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checked-checkbox"
                    className="ms-2 text-md font-semibold text-gray-900 dark:text-gray-300"
                  >
                    Instagram
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked={formData.sosmed.includes(2)}
                    onChange={() => handleCheckboxChange(2)}
                    id="checked-checkbox"
                    type="checkbox"
                    value={2}
                    className="w-4 h-4 text-cyan-800 bg-gray-100 border-gray-300 rounded focus:text-cyan-800 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checked-checkbox"
                    className="ms-2 text-md font-semibold text-gray-900 dark:text-gray-300"
                  >
                    Twitter
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked={formData.sosmed.includes(3)}
                    onChange={() => handleCheckboxChange(3)}
                    id="checked-checkbox"
                    type="checkbox"
                    value={3}
                    className="w-4 h-4 text-cyan-800 bg-gray-100 border-gray-300 rounded focus:text-cyan-800 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checked-checkbox"
                    className="ms-2 text-md  font-semibold text-gray-900 dark:text-gray-300"
                  >
                    LinkedIn
                  </label>
                </div>
                <div className="flex justify-end">
                <Button type="submit" className="px-3 mt-3 font-bold">
                  Submit
                </Button>
                </div>
              </div>
            </form>
          </div>

        
        </div>
      </Layout>
    </div>
  );
};

export default DetailPage;
