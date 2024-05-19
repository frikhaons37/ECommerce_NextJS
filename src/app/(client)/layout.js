import Menu from '@/components/client/menu.jsx';
export default function Layout({children}) {
    return (
        <>
        <Menu />
        {children}
        </>
    )
}