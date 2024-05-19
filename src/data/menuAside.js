import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiVuejs,
} from '@mdi/js'

const menuAside = [
  {
    href: '/admin/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/admin/products',
    label: 'Produits',
    icon: mdiTable,
  },
  {
    href: '/admin/category',
    label: 'Catégories',
    icon: mdiSquareEditOutline,
  },

  {
    href: '/admin/scategories',
    label: 'Sous/Catégories',
    icon: mdiResponsive,
  },
  {
    href: '/admin/listClients',
    label: 'Client',
    icon: mdiTelevisionGuide,
  },
  {
    href: '/admin/orders',
    label: 'Commandes',
    icon: mdiAccountCircle,
  },
  {
    href: '/login',
    label: 'Calendrier',
    icon: mdiLock,
  },

  {
    href: 'https://github.com/justboil/admin-one-react-tailwind',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank',
  },
  {
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'Vue version',
    icon: mdiVuejs,
    target: '_blank',
  },
]

export default menuAside
