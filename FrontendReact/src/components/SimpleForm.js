import React, { useState, useEffect } from "react";
import update from 'react-addons-update';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function SimpleForm(props) {
  const [name, setName] = useState("");
  const [options, setOptions] = useState([{ "score": 0, "description": "" }]);
  const [status, setStatus] = useState();//Only used on edit

  useEffect(() => {
    async function GetData() {
      const res = await fetch('https://[REDACTED]/Api/GetDesire/' + props.id, {
        method: 'GET', // or 'PUT'
      });
      let modalMessage = { title: "", body: "" };
      res.json()
        .then(res => {
          if (res.status == true) {
            setName(res.data.name);
            setOptions(res.data.options);
            setStatus(res.data.status);
          }
          else {
            modalMessage.title = "Fetch Data Failed";
            modalMessage.body = res.message;
            props.openModal(modalMessage);
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          modalMessage.title = "Error";
          modalMessage.bofy = err;
          props.openModal(modalMessage);
        });
    }
    if (props.id) { //If edit
      GetData();
    }
    else { //If create
      setOptions(props.initialOptions);
    }
  }, []);

  function HandleTxtChange(event) {
    let id = event.target.id;
    let idar = id.split('-');

    if (idar[0] == "createds") {
      if (idar[1] == "name") {
        let newName = name;
        newName = event.target.value;
        setName(newName);
        console.log(name);
      }
      else if (idar[1] == "opt") {
        let newOptions = options.slice();
        if (idar[3] == "score") {
          newOptions[idar[2]].score = parseInt(event.target.value);
        }
        else if (idar[3] == "desc") {
          newOptions[idar[2]].description = event.target.value;
        }
        setOptions(newOptions);
        console.log(options);
      }
      //console.log(options);
    }
  }

  function HandleBtnOpt(event) {
    let newOptions;
    if (event == "+") {
      newOptions = update(options, { $push: [{ "score": 0, "description": "" }] });
    }
    else if (event == "-") {
      let index = options.length - 1;
      newOptions = update(options, { $splice: [[index, 1]] });
    }

    setOptions(newOptions);
  }

  function HandleSubmit(event) {
    let ds;
    let url;
    let method;
    if (props.id) { //Edit
      ds = { "id": parseInt(props.id), "name": name, "options": options, "status": status };
      url = 'https://[REDACTED]/Api/UpdateDesire';
      method = 'PUT';
    }
    else { //Create
      ds = { "name": name, "options": options };
      url = 'https://[REDACTED]/Api/CreateDesire';
      method = 'POST';
    }
    console.log(ds);

    async function postData() {
      const res = await fetch(url, {
        method: method, // or 'PUT'
        body: JSON.stringify(ds), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let modalMessage = { title: "", body: "" };
      res.json()
        .then(res => {
          if (res.status == true) {
            modalMessage.title = props.id ? "Update Success" : "Create Success";
          }
          else {
            modalMessage.title = props.id ? "Update Failed" : "Create Failed";
            modalMessage.body = res.message;
          }
          console.log(res);
          props.openModal(modalMessage);
        })
        .catch(err => {
          console.log(err);
          modalMessage.title = "Error";
          modalMessage.body = err;
          props.openModal(modalMessage);
        });
    }

    postData();
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item lg xs></Grid>
        <Grid item lg={6} xs={10}>
          <h3>{props.title} {props.id ? <>{props.id}</> : <></>}</h3>
          <TextField id="createds-name" label="Name" value={name} variant="standard" InputLabelProps={{ shrink: true, }} fullWidth
            onChange={HandleTxtChange}
          /><br></br>
          <IconButton aria-label="edit" onClick={() => HandleBtnOpt('+')}>
            <AddIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => HandleBtnOpt('-')}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <OptionInputList items={options} onChange={HandleTxtChange}></OptionInputList>
          <Button id="btn-submit" variant="contained" color="primary" onClick={HandleSubmit}>Submit</Button>
        </Grid>
        <Grid item lg xs></Grid>
      </Grid>
    </div>
  );
}

function OptionInputList(props) {
  return (
    <>
      {props.items.map((item, index) => (
        <div key={index}>
          <TextField id={`createds-opt-${index}-score`} value={item.score} label="Score" type="number" variant="standard" InputLabelProps={{ shrink: true, }} fullWidth
            onChange={props.onChange}
          /><br></br>
          <TextField id={`createds-opt-${index}-desc`} value={item.description} label="Description" variant="standard" InputLabelProps={{ shrink: true, }} fullWidth
            onChange={props.onChange}
          /><br></br>
        </div>
      ))}
    </>
  );
}

export { SimpleForm };