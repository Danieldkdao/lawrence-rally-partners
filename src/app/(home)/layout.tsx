import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative isolate min-h-screen w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
