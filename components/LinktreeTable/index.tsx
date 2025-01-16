"use client";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  Row,
} from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Template {
  id: number;
  link: string;
  name: string;
}

interface TemplateTableState {
  data: Template[];
  loading: boolean;
  fetchData: () => Promise<void>;
}

export const LinktreeTable = () => {
  const [data, setData] = useState<Template[]>([]);

  useEffect(() => {
    {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/link-dashboard`
      );
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Define columns
  const columnHelper = createColumnHelper<Template>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("link", {
      header: "Link",
      cell: (info) => info.getValue(),
    }),

    columnHelper.display({
      id: "edit",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <Link href={`/dashboard/detail/${row.original.id}`}>
            {/* <a className="bg-yellow-500 w-20  text-white px-3 py-1 rounded text-base">
              Edit
            </a> */}
          <button
            onClick={() => null}
            className="bg-yellow-500 w-20  text-white px-3 py-1 rounded text-base"
          >
            Edit
          </button>
          </Link>
          <button
            onClick={() => null}
            className="bg-red-500 w-20  text-white px-3 py-1 rounded text-base"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    pageCount: 10,
    state: {
      pagination: {
        pageIndex: 1,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,

    onPaginationChange: ({ pageIndex }: any) => {
      //   setPage(pageIndex + 1);
    },
  });

  return (
    <>
      <div className="overflow-x-auto mt-2 pb-5 px-3">
        <table className=" table-fixed w-[600px] lg:w-full  bg-white border border-gray-200 rounded-lg">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {/* <div className="flex justify-center space-x-2 my-4 ">
          <button
            onClick={() => setPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-cyan-500 text-white hover:bg-cyan-600"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              className={` py-1 rounded-md ${
                index + 1 === currentPage ? " text-cyan-500" : " text-cyan-400"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-cyan-500 text-white hover:bg-cyan-600"
            }`}
          >
            Next
          </button>
        </div> */}
        <div className="flex justify-center ">
          {/* <p className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </p> */}
        </div>
      </div>
    </>
  );
};
