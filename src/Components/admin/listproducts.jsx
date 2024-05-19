"use client";
import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import Image from "next/image";
import Button from 'react-bootstrap/Button';
import { deleteArticle } from "@/services/ArticleService";
import { useRouter } from "next/navigation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Listproducts = ({ produits }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        router.refresh();
    }, []);

    const deletearticle = (id) => {
        if (window.confirm("Supprimer le produit ?")) {
            deleteArticle(id)
                .then((res) => {
                    console.log(res);
                    router.refresh();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const getBase64ImageFromUrl = async (imageUrl) => {
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const exportToPDF = async () => {
        const doc = new jsPDF();
        const tableRows = [];

        for (const product of produits) {
            const imageBase64 = await getBase64ImageFromUrl(product.imageart);
            const rowData = [
                { content: '', image: imageBase64 },
                product.reference,
                product.designation,
                product.marque,
                product.prix,
                product.qtestock
            ];
            tableRows.push(rowData);
        }

        doc.autoTable({
            head: [['Image', 'Référence', 'Désignation', 'Marque', 'Prix', 'Stock']],
            body: tableRows,
            didDrawCell: data => {
                if (data.column.index === 0 && data.cell.section === 'body') {
                    doc.addImage(data.cell.raw.image, 'JPEG', data.cell.x + 2, data.cell.y + 2, 5, 5
                    );
                }
            }
        });

        doc.save('liste_produits.pdf');
    };

    const filteredProducts = produits.filter(product => {
        return product.marque.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: 'imageart',
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
                            alt="product name"
                            height="50"
                            width="50"
                        />
                    </Box>
                ),
            },
            {
                accessorKey: 'reference',
                header: 'Référence',
                size: 100,
            },
            {
                accessorKey: 'designation',
                header: 'Désignation',
                size: 100,
            },
            {
                accessorKey: 'marque',
                header: 'Marque',
                size: 100,
            },
            {
                accessorKey: 'prix',
                header: 'Prix',
                size: 100,
            },
            {
                accessorKey: 'qtestock',
                header: 'Stock',
                size: 100,
            },
            {
                accessorKey: '_id',
                header: 'Actions',
                size: 100,
                Cell: ({ cell, row }) => (
                    <div>
                        <Button
                            onClick={(e) => {
                                deletearticle(cell.row.original._id, e);
                            }}
                            variant="danger"
                            size="md"
                            className="text-danger btn-link delete"
                        >
                            <DeleteForeverIcon />
                        </Button>
                        <Button
                            onClick={(e) => {
                                router.push(`/admin/products/editProduct?productId=${cell.row.original._id}`);
                            }}
                            variant="info"
                            size="md"
                            className="text-info btn-link edit"
                        >
                            <EditIcon />
                        </Button>
                    </div>
                ),
            },
        ],
        [produits],
    );

    return (
        <div className="container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Rechercher par marque..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        borderRadius: '20px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        width: '100%',
                        marginBottom: '20px',
                    }}
                />
            </div>
            <Button variant='dark' size="sm" onClick={exportToPDF}>
                Export PDF
            </Button>
            <Button variant='dark' size="sm" style={{ marginLeft: '10px' }}>
                <Link href="/admin/products/newProduct">
                    <AddCircleOutlineIcon style={{ fontSize: 14, color: 'aqua' }} /> Nouveau
                </Link>
            </Button>

            <MaterialReactTable columns={columns} data={filteredProducts} />
        </div>
    );
};

export default Listproducts;
