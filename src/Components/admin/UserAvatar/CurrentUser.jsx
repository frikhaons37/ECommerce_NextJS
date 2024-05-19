import React from 'react'
import UserAvatar from '.'
import { useSession } from 'next-auth/react'



const UserAvatarCurrentUser = ({ className = '', children }) => {
  // const userEmail = useAppSelector((state) => state.main.userEmail)
  const {data} = useSession()

  return (
    <UserAvatar username={data?.user?.name || ''} className={className}>
      {children}
    </UserAvatar>
  )
}

export default UserAvatarCurrentUser