"use client";

import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React from "react";
import { useRouter } from "next/router";

export default function BreadcrumbComponent() {
  const router = useRouter();
  const { pathname } = router;
  // Fungsi untuk memecah URL menjadi segmen breadcrumb
  const generateBreadcrumbItems = () => {
    const pathSegments = pathname.split("/").filter(Boolean); // Memisahkan segmen path
    const breadcrumbItems = [];

    breadcrumbItems.push(
      <Breadcrumb.Item href="/" icon={HiHome} key="home">
        Home
      </Breadcrumb.Item>
    );

    pathSegments.forEach((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");

      // Menambahkan breadcrumb item terakhir tanpa href
      if (index === pathSegments.length - 1) {
        breadcrumbItems.push(
          <Breadcrumb.Item key={href}>{capitalize(segment)}</Breadcrumb.Item>
        );
      } else {
        breadcrumbItems.push(
          <Breadcrumb.Item href={href} key={href}>
            {capitalize(segment)}
          </Breadcrumb.Item>
        );
      }
    });

    return breadcrumbItems;
  };

  // Fungsi untuk mengubah string menjadi format kapitalisasi
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");

  return (
    <div className="p-4 bg-gray-50">
      <Breadcrumb aria-label="Dynamic breadcrumb example">
        {generateBreadcrumbItems()}
      </Breadcrumb>
    </div>
  );
}
