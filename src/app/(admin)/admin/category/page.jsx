import Link from "next/link";
import Button from 'react-bootstrap/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";
import CategoriesTable from "./CategoriesTable";


const Listcategories = async () => {
    
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/categories/`, {cache: 'no-store'}).then(data => data.json());

    return (
        <>
            <div>
                <Button variant='light' size="sm">
                    <Link href="/admin/category/newCategory" style={{ textDecoration: 'none', color: 'galaxy', fontSize: 14 }}>
                        <AddCircleOutlineIcon /> Nouveau
                    </Link>
                </Button>
                <CategoriesTable data={data} />
            </div>
        </>
    );
};

export default Listcategories;
