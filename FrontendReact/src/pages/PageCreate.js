import React from "react";
import { SimpleForm } from '../components/SimpleForm';

function PageCreate(props) {
  const initialOptions = [
    { "score": -2, "description": "Very Low" },
    { "score": -1, "description": "Low" },
    { "score": 0, "description": "Neutral" },
    { "score": 1, "description": "High" },
    { "score": 2, "description": "Very High" },
  ];

  return (<SimpleForm initialOptions={initialOptions} openModal={props.openModal}></SimpleForm>);
}

export { PageCreate };