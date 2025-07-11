import Header from "@nyx-frontend/main/components/Header"
import Footer from "@nyx-frontend/main/components/Footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
          body{
            background: linear-gradient(52.6deg, var(--start-gradient) 0.83%, var(--end-gradient) 100.51%);
            background-attachment: fixed;
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}</style>
      <Header />
      {children}
      {<Footer />}
    </>
  )
}