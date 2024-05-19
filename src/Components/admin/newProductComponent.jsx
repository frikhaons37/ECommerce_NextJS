"use client"
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useRouter } from "next/navigation";
import { addArticle } from '@/services/ArticleService';

import axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useFormik } from 'formik';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const NewProduct = ({ scategories }) => {

  const router = useRouter();

  const [files, setFiles] = useState([]);


  const [imageart, setImageart] = useState("");


  const serverOptions =  {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file)
      const data = new FormData();
      
        data.append('file', file);
        data.append('upload_preset', 'mkuyuwk4');
        data.append('cloud_name', 'dnqfo15go');
        data.append('public_id', file.name);
        axios.post('https://api.cloudinary.com/v1_1/dnqfo15go/image/upload',data)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
         setImageart(data.url) ;
          load(data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          error('Upload failed');
          abort();
        });
    },
};

  const createProduct = async (data) => axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/api/articles`, data)

  const formik = useFormik({
    initialValues: {
      reference: "",
      designation: "",
      prix: "",
      marque: "",
      qtestock: "",
      imageart: imageart,
    }, onSubmit: (values) => {
      console.log({values})
      createProduct({...values, imageart}).then(() => {
        router.replace('/admin/products');
      router.refresh();
      }).catch(() => {
        alert("error")
      });
      

    }
  })
  
  return (


    <form onReset={formik.handleReset} onSubmit={formik.handleSubmit} className='px-5 flex flex-col gap-10 ' >
      <h1 className="leading-tight text-2xl">Ajout Produit</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.reference} name='reference' title='Référence *' type='text' />
        <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.designation} name='designation' title='Désignation' type='text' />
        <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.marque} name='marque' title='Marque *' col={2} type='text' />
        <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.prix} name='prix' title='Prix' type='number' />
        <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.qtestock} name='qtestock' title='Qté stock *' type='number' />
      </div>

      <div className='flex flex-col gap-2 '>
        <label htmlFor="scategorieID">Sub Category</label>
        <select onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.scategorieID} className='outline-none bg-transparent border-2 border-black rounded  ' name="scategorieID" id="scategorieID">
          <option disabled selected value> -- select an option -- </option>
          {scategories.map((scategorie) => <option key={scategorie._id} value={scategorie._id}>
            {scategorie.nomscategorie}
          </option>)}
        </select>
      </div>
      <div className='flex flex-col gap-2 '>
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
        
        <Button type="submit" className='px-1 py-2 rounded-lg bg-pink-700 text-white'>Enregistrer</Button>
        <Button type="reset" className='px-1 py-2 rounded-lg bg-blue-350 text-white'>Annuler</Button>
      </div>
    </form>


  );
};

export default NewProduct


const InputData = ({ type = "text", name = "", title = "", col, ...restprops }) => {

  return <>
    <div className={`flex flex-col gap-2 ${col ? "col-span-2" : "col-span-1"}`}>
      <label htmlFor={name}>{title}</label>
      <input {...restprops} className='outline-none bg-transparent border-2 border-black rounded ' placeholder={title} type={type} name={name} id={name} />
    </div>
  </>
};
