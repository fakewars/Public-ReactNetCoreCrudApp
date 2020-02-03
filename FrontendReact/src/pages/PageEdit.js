import React from "react";
import { SimpleForm } from '../components/SimpleForm';

function PageEdit(props) {
  return (<SimpleForm id={props.id} openModal={props.openModal}></SimpleForm>);
}

export { PageEdit };