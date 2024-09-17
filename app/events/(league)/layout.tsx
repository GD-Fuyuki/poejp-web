import Header from "@/components/header";
import SideNavigation from "@/components/league/sidenav";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen flex">
      {/* NAV */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <SideNavigation />
      </div>
      {/* HEAD */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <div className="h-[6%]">
          <Header />
        </div>
        <div className="h-[94%] p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
export default Layout;