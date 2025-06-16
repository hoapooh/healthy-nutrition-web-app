import ScrollToTop from "@/features/shared/ui/components/scroll-to-top-button";
import HomeFooter from "../components/home-footer";
import HomeNavbar from "../components/home-navbar";
import HomeFeedback from "../components/home-feedback";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="flex h-full w-full flex-col">
      <HomeNavbar />
      <div className="flex flex-1 pt-[68px]">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <HomeFeedback />
      <HomeFooter />
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};
