export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/*Load necessary dynamic colors*/}
        <div className="bg-emerald-500 bg-amber-700 bg-amber-400 bg-gray-500 hidden" />
        {children}
      </body>
    </html>
  )
}
