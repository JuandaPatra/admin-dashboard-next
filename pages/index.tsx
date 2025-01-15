import { Layout } from "@/components/Layout";
import {useState} from 'react'
import { useDrag, useDrop } from "react-dnd";

const ItemType = {
  BOX: "box",
};

export default function Home() {

  return (
    <div className="bg-slate-200">
    <Layout>
      <div>
        <h2>Welcome to the homepage</h2>
      </div>
    </Layout>
    </div>
  );
}
