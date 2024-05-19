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
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const NewProduct = ({ scategories }) => {
  const router = useRouter();




  return (
    <div>
      <Form  >
        <h2>Ajout Produit</h2>
        <div className="container w-100 d-flex justify-content-center">
          <InputData name='' title='Référence *' type='text' />
          <InputData name='' title='Désignation' type='text' />
          <InputData name='' title='Marque *' type='text' />
          <InputData name='' title='Prix' type='number' />
          <InputData name='' title='Qté stock *' type='text' />
        </div>

        <Button type="submit">Enregistrer</Button>
        <Button type="button" className="btn btn-warning"
          onClick={() => handleReset()}>Annuler</Button>
      </Form>
    </div>
  );
};
export default NewProduct

const InputData = ({ type = "text", name = "", title = "" }) => {

  return <>
    <div>
      <label htmlFor={name}>{title}</label>
      <input type={type} name={name} id={name} />
    </div>
  </>
}