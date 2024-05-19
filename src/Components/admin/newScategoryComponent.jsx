"use client"
import React, { useState } from 'react';
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


const NewScategory = ({ scategories }) => {
  const router = useRouter();

  const [files, setFiles] = useState([]);


  const [imagescat, setimagescat] = useState("");

  const serverOptions = {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      console.log(file);
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'ons');
      data.append('cloud_name', 'djhczchbe');
      data.append('public_id', file.name);
      axios.post('https://api.cloudinary.com/v1_1/djhczchbe/image/upload', data)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setimagescat(data.url);
          load(data);
        })
        .catch((err) => {
          console.error('Error uploading file:', err);
          error('Upload failed');
          abort();
        });
    }
  };

  process: (fieldName, file, metadata, load, error, progress, abort) => {
    console.log(file)
    const data = new FormData();
    {
      data.append('file', file);
      data.append('upload_preset', 'ons');
      data.append('cloud_name', 'djhczchbe');
      data.append('public_id', file.name);
      axios.post('https://api.cloudinary.com/v1_1/djhczchbe/image/upload',
        data)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setimagescat(data.url);
          load(data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          error('Upload failed');
          abort();
        });

    };

  }
  const fetchData = async (data) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/api/scategories`, data)
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  }

  const formik = useFormik({
    initialValues: {
      nomscategorie: "",
      
      imagescat: imagescat,
      categorieID: "",
    }, onSubmit: (values) => {
      fetchData(values);
    }
  })

  return (


    <form onReset={formik.handleReset} onSubmit={formik.handleSubmit} className='px-5 flex flex-col gap-10 ' >
      <h1 className="leading-tight text-2xl">Ajout sous catégorie</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputData onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nomcategorie} name='nomcategorie' title='Nom catégorie *' type='text' />   
      </div>

      <div className='flex flex-col gap-2 '>
        <label htmlFor="categorieID">Category</label>
        <select onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.categorieID} className='outline-none bg-transparent border-2 border-black rounded  ' name="categorieID" id="categorieID">
          {[1, 2, 3, 4, 5].map((num) => <option key={num} value={num}>
            {num}
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
        <Button type="submit">Enregistrer</Button>
        <Button type="reset" className="btn btn-warning">Annuler</Button>
      </div>
    </form>


  );
};

export default NewScategory


const InputData = ({ type = "text", name = "", title = "", col, ...restprops }) => {

  return <>
    <div className={`flex flex-col gap-2 ${col ? "col-span-2" : "col-span-1"}`}>
      <label htmlFor={name}>{title}</label>
      <input {...restprops} className='outline-none bg-transparent border-2 border-black rounded ' placeholder={title} type={type} name={name} id={name} />
    </div>
  </>
};
