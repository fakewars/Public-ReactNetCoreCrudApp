import React, { useState, useEffect } from "react";
import update from 'react-addons-update';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import OptionsRadio from '../components/OptionsRadio';

//TODO Handle txt change

function PageDaily(props) {
  const [dss, setDss] = useState([{ "id": 0, "name": "", "options": [""] }]);
  const [dayRecords, setDayRecords] = useState([]);
  useEffect(() => {
    let reqParam = {
      "SearchParam": "",
      "Status": "ACTIVE",
      "SortColumn": "",
      "SortDirection": "",
      "RowCount": 0,
      "Page": 0
    };

    async function fetchData() {
      const res = await fetch("https://[REDACTED]/Api/GetDesires", {
        method: 'POST',
        body: JSON.stringify(reqParam),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      res.json()
        .then(res => {
          setDss(res.data);
          setDayRecords(res.data.map(ds => ({
            "DesireId": ds.id,
            "Score": 0,
            "Comment": ""
          })));
        })
        .catch(err => console.log('error'));
    }

    fetchData();
  }, []);

  function HandleSubmit(event) {
    async function postData() {
      const res = await fetch('https://[REDACTED]/Api/EnterDayRecord', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(dayRecords), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let modalMessage = { title: "", body: "" };
      res.json()
        .then(res => {
          if (res.status == true) {
            modalMessage.title = "EnterDayRecord Success";
          }
          else {
            modalMessage.title = "EnterDayRecord Failed";
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

    // console.log(dss);
    console.log(dayRecords);

    postData();
  }

  function HandleRadioChange(identifier, value) {
    let newDayRecord = dayRecords.slice(); //To create a copy
    newDayRecord[identifier].Score = parseInt(value);
    setDayRecords(newDayRecord);
  }

  function HandleTxtChange(identifier, event) {
    let newDayRecord = dayRecords.slice(); //To create a copy
    newDayRecord[identifier].Comment = event.target.value;
    setDayRecords(newDayRecord);
  }

  return (
    <Grid container spacing={3}>
      <Grid item lg xs></Grid>
      <Grid item lg={10} xs={10}>
        <table>
          <tbody>
            {
              dss.map((ds, index) => (
                <tr key={ds.id} style={{ borderBottom: "1pt solid grey" }}>
                  <td style={{ paddingRight: "5px" }}>{ds.name}</td>
                  <td><OptionsRadio identifier={index} options={ds.options} onChange={HandleRadioChange} /></td>
                  <td><TextField value={dayRecords.Comment} onChange={() => HandleTxtChange(index, event)}></TextField></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Button id="btn-submit" variant="contained" color="primary" onClick={HandleSubmit}>Submit</Button>
      </Grid>
      <Grid item lg xs></Grid>
    </Grid>
  );
}

export { PageDaily };