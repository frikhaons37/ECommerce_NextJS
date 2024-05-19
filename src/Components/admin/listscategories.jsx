"use client"
import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Image from "next/image"


import Button from 'react-bootstrap/Button';
import { deleteSCategorie } from "@/services/ScategorieService"
import { useRouter } from "next/navigation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Link from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const Listscategories = ({ categories }) => {

    const router = useRouter();
    const deleteSCategoriePrompt = (id) => {
        if (window.confirm("supprimer le sous catégorie' O/N")) {
            deleteSCategorie(id)
                .then((res) => {
                    console.log(res)
                    router.refresh()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'imagescat',
                header: 'Image',
                Cell: ({ cell }) => (
                    <Box
                        sx={{

                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <Image
                            src={cell.getValue()}
                            alt="scategorie anme"
                            height="50"
                            width="50"
                        />

                    </Box>),
            },
            {
                accessorKey: 'nomscategorie',
                header: 'Nom de sous catégorie',
                size: 100,
            },
            {
                accessorKey: '_id',
                header: 'actions',

                size: 100,
                Cell: ({ cell, row }) => (
                    <div >
                        <Button
                            onClick={(e) => {
                                deleteSCategoriePrompt(cell.row.original._id, e);
                            }}
                            variant="danger"
                            size="md"
                            className="text-danger btn-link delete"
                        >
                            <DeleteForeverIcon />
                        </Button>
                    </div>
                ),
            },

        ],
        [],
    );
    return (
        <div>
            <Button
                variant='light'
                size="sm"
            >
                <Link
                    href="/admin/scategories/newScategory"
                    style={{
                        textDecoration: 'none',
                        color: 'galaxy',
                        fontSize: 14,
                    }}
                >
                    <AddCircleOutlineIcon /> Nouveau
                </Link>
            </Button>
            <MaterialReactTable columns={columns} data={categories} />
        </div>

    )
}
export default Listscategories;