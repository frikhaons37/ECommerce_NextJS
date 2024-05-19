import React from 'react'
import { mdiLogout, mdiClose } from '@mdi/js'
import Icon from '../Icon'
import AsideMenuList from './List'
import AsideMenuItem from './Item';
import { useSession, signIn, signOut } from 'next-auth/react'


export default function AsideMenuLayer({ menu, className = '', ...props }) {
  // const darkMode = useAppSelector((state) => state.darkMode.isEnabled)
  const darkMode = false;

  const logoutItem = {
    label: 'Logout',
    icon: mdiLogout,
    color: 'info',
    isLogout: true,
  }

  const handleAsideLgCloseClick = (e) => {
    e.preventDefault()
    props.onAsideLgCloseClick()
  }

  return (
    <aside
      className={`${className} zzz lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden`}
    >
      <div
        className={`aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900`}
      >
        <div
          className={`aside-brand flex flex-row h-14 items-center justify-between dark:bg-slate-900`}
        >
          <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
            <b className="font-black">NOCIBE</b>
          </div>
          <button
            className="hidden lg:inline-block xl:hidden p-3"
            onClick={handleAsideLgCloseClick}
          >
            <Icon path={mdiClose} />
          </button>
        </div>
        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden ${darkMode ? 'aside-scrollbars-[slate]' : 'aside-scrollbars'
            }`}
        >
          <AsideMenuList menu={menu} />
        </div>
        <ul>
          <li>
            <div onClick={signOut} className="flex cursor-pointer py-3 border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600">
              <span className="inline-flex justify-center items-center w-16 h-6 flex-none ">
                <svg viewBox="0 0 24 24" width={18} height={18} className="inline-block">
                  <path
                    fill="currentColor"
                    d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                  />
                </svg>
              </span>
              <span className="grow text-ellipsis line-clamp-1 pr-12 ">Logout</span>
            </div>

          </li>
        </ul>
      </div>
    </aside>
  )
}
