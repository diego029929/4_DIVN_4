export default function AdminLayout({ children }: any) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      {children}
    </div>
  )
}
