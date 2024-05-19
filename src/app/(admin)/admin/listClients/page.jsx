import CardBox from "@/Components/admin/CardBox";
import AreaUsersList from "@/Components/admin/dashboard/areaUsersList";
import { User } from "lucide-react";

export default function Page () {
    return (
        <section className="flex m-4 gap-2">
                <CardBox className="w-full" hasTable>
            <div className="flex items-center bg-gray-50 dark:bg-slate-800 dark:text-slate-100 justify-start">
                        <span className="inline-flex justify-center items-center w-6 h-6 mr-2">
                            <User />
                        </span>
                        <h1 className="leading-tight text-2xl">Clients</h1>
                    </div>
                    <AreaUsersList role="user" />
                </CardBox>
            </section>
    )
}