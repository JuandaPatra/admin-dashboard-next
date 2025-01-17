import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export function SidebarLayout() {
  const router = useRouter();
  const [activePath, setActivePath] = useState<string>("");

  useEffect(() => {
    // Update the activePath whenever the route changes
    setActivePath(router.pathname);
  }, [router.pathname]);

  const isActive = (path: string) => {
    if (path === "/") {
      return activePath === "/";
    }
    // For other paths, use startsWith for dynamic and nested routes
    return activePath === path || activePath.startsWith(path + "/");
  };
  return (
    <div className="">
      <Sidebar className="h-[100vh]">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" icon={HiChartPie}
             active={isActive("/")}
             >
              Home
            </Sidebar.Item>
            <Sidebar.Item
              href="/dashboard"
              icon={HiViewBoards}
              labelColor="dark"
              active={isActive("/dashboard")}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox} label="3" >
              Sosmed
            </Sidebar.Item>
            
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
