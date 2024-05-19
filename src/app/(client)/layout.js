import Menu from "@/Components/Client/menu";

export default function Layout({children}) {
    return (
        <>
        <Menu />
        {children}
        </>
    )
}