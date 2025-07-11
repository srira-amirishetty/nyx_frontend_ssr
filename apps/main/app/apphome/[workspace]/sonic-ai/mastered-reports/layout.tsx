export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        .premium {
          display: block !important;
        }
        .generic {
          display: none;
        }
      `}</style>
      {children}
    </>
  )
}