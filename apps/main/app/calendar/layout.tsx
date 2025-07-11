import Sidebar from "@nyx-frontend/main/components/Sidebar";
import Footer from "@nyx-frontend/main/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="justify-start flex w-full gray_bg">
      <Sidebar />
      <section className="h-full overflow-y-auto flex-1">
        {children}
        <Footer />
      </section>
    </div>
  );
}
