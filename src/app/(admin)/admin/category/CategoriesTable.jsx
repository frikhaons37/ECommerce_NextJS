'use client'
import { useMemo, useState,useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteCategory } from '@/services/CategoryService';
import { Button } from 'react-bootstrap';

const CategoriesTable = ({data}) => {
    const router = useRouter();
    const deleteCategorie = (id) => {
        if (window.confirm("Supprimer la catégorie ?")) {
            deleteCategory(id)
                .then((res) => {
                    console.log(res);
                    router.refresh();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'imagecategorie',
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
                            alt="categorie name"
                            height="50"
                            width="50"
                        />
                    </Box>
                ),
            },
            {
                accessorKey: 'nomcategorie',
                header: 'Nom de  catégorie',
                size: 100,
            },
            {
                accessorKey: '_id',
                header: 'Actions',
                size: 100,
                Cell: ({ cell }) => (
                    <div>
                        <Button
                            onClick={(e) => {
                                deleteCategorie(cell.row.original._id, e);
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
        [data],
    );

    return <MaterialReactTable data={data} columns={columns} />
}

export default CategoriesTable