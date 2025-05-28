import HomeFooter from "../components/home-footer";
import HomeNavbar from "../components/home-navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="flex h-full w-full flex-col">
      <HomeNavbar />

      <div className="flex flex-1 pt-[4rem]">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <HomeFooter />
    </div>
  );
};
