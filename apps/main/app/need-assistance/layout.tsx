import Header from "@nyx-frontend/main/components/Header"
import Footer from "@nyx-frontend/main/components/Footer"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
      <Header />
      {children}
        {/* <Navbar /> */}
        {/* <main>{children}</main> */}
        {<Footer />}
      </>
    )
  }