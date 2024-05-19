import '@/css/main.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import AdminLayoutClient from '@/Components/admin/AdminLayoutClient'
export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions)
  console.log(`the loggin is ${JSON.stringify(session)}`)
if (!session || session && session.user.role !== 'admin') {
return (
<>
<div className="grid h-screen place-content-center bg-white px-4">
  <h1 className="uppercase tracking-widest text-gray-500">404 | Vous etes pas autorisé d'accéder à cette page</h1>
</div>
</>
)
}
  
  
  
  

  
  
  
  
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}