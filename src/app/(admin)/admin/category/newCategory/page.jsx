"use client"
import { useFormik } from "formik"
import React, { useEffect, useState } from "react"


import axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import { BadgePlus } from 'lucide-react';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useRouter } from "next/navigation";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)



const NewCategory = () => {

    const router = useRouter();
  
    const [files, setFiles] = useState([]);
  
  
    const [imagecategorie, setimagecategorie] = useState("");
  
    const serverOptions = {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'mkuyuwk4');
        data.append('cloud_name', 'dnqfo15go');
        data.append('public_id', file.name);
        axios.post('https://api.cloudinary.com/v1_1/dnqfo15go/image/upload', data)
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setimagecategorie(data.url);
            load(data);
          })
          .catch((err) => {
            console.error('Error uploading file:', err);
            error('Upload failed');
            abort();
          });
      }
    };
      const fetchData = async (data) => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/api/categories`, data)
          console.log(response);
        } catch (error) {
          console.log(error);
        }
    
      }
      const formik = useFormik({
        initialValues: {
            nomcategorie: "",
            imagecategorie: imagecategorie
        }, onSubmit: (values) => {
          fetchData({...values, imagecategorie});

          router.replace('/admin/category')
          router.refresh();
        }
      })
    
      useEffect(() => {
        const fetchSCategory = async () => {
          let data = await fetch("").then(res => res.json())
    
        }
       
      }, [])
      return (
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} >
          
          <h1 className="leading-tight text-2xl flex gap-2"><BadgePlus /> Ajout Catégorie</h1>
      <div className="grid grid-cols-1   my-5">
        
      <label htmlFor="nomcategorie" className="flex w-3/4 flex-col gap-3 capitalize">
            Category Name
            <input 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} value={formik.values.nomcategorie} 
            className="w-full rounded border-2 border-red-600 outline-none" type="text" 
            name="nomcategorie" id="categoryname" />
          </label>
      
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
            <button type="submit">Enregistrer</button>
            <button type="reset" className="btn btn-warning">Annuler</button>
          </div>
      </div>
        </form>
      );
    }
export default NewCategory