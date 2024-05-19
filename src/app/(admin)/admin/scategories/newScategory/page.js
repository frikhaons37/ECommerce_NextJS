"use client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useRouter } from "next/navigation";
import { fetchSCategories } from "@/services/ScategorieService";
import { fetchCategories } from "@/services/CategoryService";
import { BadgePlus } from "lucide-react";
import { SquarePlus } from "lucide-react";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const NewScategory = () => {
  const router = useRouter();

  const [files, setFiles] = useState([]);
  const [categories, setScategories] = useState([]);
  const [categorieID, setCategorieID] = useState();

  const [imagescategorie, setimagescategorie] = useState("");

  const serverOptions = {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      console.log(file);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "mkuyuwk4");
      data.append("cloud_name", "dnqfo15go");
      data.append("public_id", file.name);
      axios
        .post("https://api.cloudinary.com/v1_1/dnqfo15go/image/upload", data)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setimagescategorie(data.url);
          load(data);
        })
        .catch((err) => {
          console.error("Error uploading file:", err);
          error("Upload failed");
          abort();
        });
    },
  };

  const createSubCategory = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/scategories`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      nomscategorie: "",
      scategorieID: "",
      imagescategorie: "",
    },
    onSubmit: (values) => {
      createSubCategory({ ...values, imagescat: imagescategorie });
      router.replace("/admin/scategories");
      router.refresh();
    },
  });

  useEffect(() => {
    const fetchSCategory = async () => {
      let data = await fetchCategories();
      setScategories(data);
    };
    fetchSCategory();
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      className=""
    >
      <h1 className="leading-tight text-2xl flex gap-3 items-center">
        <SquarePlus />
        Ajout Sous Catégorie
      </h1>

      <div className="grid grid-cols-1 my-3 gap-3 ">
        <label
          htmlFor="nomcategorie"
          className="flex w-3/4 flex-col gap-3 capitalize"
        >
          Scategory Name
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nomcategorie}
            className="w-full rounded border-2 border-red-600 outline-none"
            type="text"
            name="nomscategorie"
            id="categoryname"
          />
        </label>

        <div className="flex flex-col gap-2 w-3/4">
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

        <div className="flex flex-col gap-2 w-3/4 ">
          <label htmlFor="scategorieID">Sub Category</label>
          <select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.scategorieID}
            className="outline-none bg-transparent border-2 border-black rounded  "
            name="scategorieID"
            id="scategorieID"
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nomcategorie}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-3 rounded-lg"
            type="submit"
          >
            Enregistrer
          </button>
          <button type="reset" className="btn btn-danger ">
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
};
export default NewScategory;
