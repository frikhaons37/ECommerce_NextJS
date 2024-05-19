"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import InputData from '@/Components/admin/InputData';
import { useFormik } from 'formik';

// Register FilePond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EditProduct = ({ scategories }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');

    const [files, setFiles] = useState([]);
    const [imageart, setImageart] = useState("");

    const fetchProductData = async (productId) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/api/articles/${productId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product data:', error);
            return null;
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProductData(productId).then(productData => {
                if (productData) {
                    formik.setValues({
                        reference: productData.reference || "",
                        designation: productData.designation || "",
                        prix: productData.prix || "",
                        marque: productData.marque || "",
                        qtestock: productData.qtestock || "",
                        scategorieID: productData.scategorieID || "",
                        imageart: productData.imageart || ""
                    });
                    setImageart(productData.imageart || "");
                }
            });
        }
    }, [productId]);

    const serverOptions = {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'mkuyuwk4');
            data.append('cloud_name', 'dnqfo15go');
            data.append('public_id', file.name);
            axios.post('https://api.cloudinary.com/v1_1/dnqfo15go/image/upload', data)
                .then((response) => response.data)
                .then((data) => {
                    setImageart(data.url);
                    load(data.url);
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                    error('Upload failed');
                    abort();
                });
        },
    };

    const updateProduct = async (data) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_KEY}/api/articles/${productId}`, data);
            router.push('/admin/products');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            reference: "",
            designation: "",
            prix: "",
            marque: "",
            qtestock: "",
            scategorieID: "",
            imageart: "",
        },
        onSubmit: (values) => {
            updateProduct({ ...values, imageart });
        }
    });

    return (
        <form onReset={formik.handleReset} onSubmit={formik.handleSubmit} className='px-5 flex flex-col gap-10'>
            <h1 className="leading-tight text-2xl">Modifier Produit</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.reference} name='reference' title='Référence *' type='text' />
                <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.designation} name='designation' title='Désignation' type='text' />
                <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.marque} name='marque' title='Marque *' col={2} type='text' />
                <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.prix} name='prix' title='Prix' type='number' />
                <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.qtestock} name='qtestock' title='Qté stock *' type='number' />
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="scategorieID">Sub Category</label>
                <select onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.scategorieID} className='outline-none bg-transparent border-2 border-black rounded' name="scategorieID" id="scategorieID">
                    <option disabled selected value> -- select an option -- </option>
                    {scategories.map((scategorie) => <option key={scategorie._id} value={scategorie._id}>
                        {scategorie.nomscategorie}
                    </option>)}
                </select>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="image">Image</label>
                <FilePond
                    files={files}
                    acceptedFileTypes="image/*"
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    server={serverOptions}
                    name="file"
                />
            </div>

            <div className='flex gap-3'>
                <Button type="submit">Enregistrer</Button>
                <Button type="reset" className="btn btn-warning">Annuler</Button>
            </div>
        </form>
    );
};

export default EditProduct;
