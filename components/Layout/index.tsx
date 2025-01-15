import BreadcrumbComponent from "../Breadcrumb";
import { SidebarLayout } from "../Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex ">
        <SidebarLayout />
        <div className="flex-grow">
          <BreadcrumbComponent />
            {children}
        </div>
      
    </div>
  );
};
