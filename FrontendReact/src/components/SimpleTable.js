import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import MUIDataTable, { TableRow, TableCell } from "mui-datatables";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { SimplePopover } from './SimplePopover';

function SimpleTable(props) {
  const [dss, setDss] = useState([]);
  const [reqParam, setReqParam] = useState({
    "SearchParam": "",
    "Status": "",
    "SortColumn": "",
    "SortDirection": "",
    "RowCount": 0,
    "Page": 0
  });
  const [shouldRefresh, setShouldRequest] = useState(0); //Change state value to trigger table's useEffect and refresh data

  useEffect(() => {
    let newReqParam = reqParam;
    newReqParam.Status = props.status;
    setReqParam(newReqParam);

    async function fetchData() {
      const res = await fetch("https://[REDACTED]/Api/GetDesires", {
        method: 'POST',
        body: JSON.stringify(reqParam),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      res.json()
        .then(res => { setDss(res.data); })
        .catch(err => console.log(err));
    }

    fetchData();
  }, [shouldRefresh]);

  function HandleEdit(id) {
    props.onNavigate('Edit' + id);
  }

  function HandleRetire(id) {
    let url = "";
    if (props.status == "ACTIVE") {
      url = 'https://[REDACTED]/Api/RetireDesire/';
    } else if (props.status == "RETIRED") {
      url = 'https://[REDACTED]/Api/UnretireDesire/';
    }
    async function retireData() {
      const res = await fetch(url + id, {
        method: 'DELETE'
      });
      res.json()
        .then(res => {
          let modalMessage = { title: "", body: "" };
          if (res.status == true) {
            modalMessage.title = props.status == "ACTIVE" ? "Retire Success" : "Unretire Success";
          }
          else {
            modalMessage.title = props.status == "ACTIVE" ? "Retire Failed" : "Unretire Failed";
            modalMessage.body = res.message;
          }
          console.log(res);
          setShouldRequest(shouldRefresh + 1);
          props.openModal(modalMessage);
        })
        .catch(err => {
          console.log(err);
          setShouldRequest(shouldRefresh + 1);
          props.openModal(err);
        });
    }
    retireData();
  }

  function HandleDelete(id) {
    async function deleteData() {
      const res = await fetch('https://[REDACTED]/Api/DeleteDesire/' + id, {
        method: 'DELETE'
      });
      res.json()
        .then(res => {
          let modalMessage = { title: "", body: "" };
          if (res.status == true) {
            modalMessage.title = "Delete Success";
          }
          else {
            modalMessage.title = "Delete Failed";
            modalMessage.body = res.message;
          }
          console.log(res);
          setShouldRequest(shouldRefresh + 1);
          props.openModal(modalMessage);
        })
        .catch(err => {
          console.log(err);
          setShouldRequest(shouldRefresh + 1);
          props.openModal(err);
        });
    }

    deleteData();
  }

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
      }
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "options",
      label: "Options",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <TableOptions
              items={value}
            />
          );
        }
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <TableActions
              id={value}
              status={props.status}
              onEdit={HandleEdit}
              onRetire={HandleRetire}
              onDelete={HandleDelete}
            />
          );
        }
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    pagination: false,
    selectableRows: "single",
    filter: false,
    print: false,
    download: false
  };

  return (
    <div>
      <MUIDataTable
        title={props.title}
        data={dss}
        columns={columns}
        options={options}
      />
      <SimplePopover></SimplePopover>
    </div>
  );
}

function TableOptions(props) {
  const [ulStyle, setUlStyle] = useState({ display: "none" });
  const [isExpand, setIsExpand] = useState(false);
  const [popAnchor, setPopAnchor] = useState(null);

  function ExpandIcon(props) {
    if (props.isExpand) { return (<ExpandLessIcon fontSize="small" />); }
    else { return (<ExpandMoreIcon fontSize="small" />); }
  }

  function HandleExpand(event) {
    if (isExpand) {
      setPopAnchor(null);
    }
    else {
      setPopAnchor(event.currentTarget);
    }
    setIsExpand(!isExpand);
  };

  const listMain = (
    <ul id="list-main" style={{ display: "block" }}>
      {props.items.map((item) => (
        <li key={item.id}>Score : {item.score} Description : {item.description}</li>
      ))}
    </ul>
  );

  return (
    <>
      <span>
        Count: {props.items.length + " "}
        <IconButton aria-label="expand" onClick={HandleExpand}>
          <ExpandIcon isExpand={isExpand}></ExpandIcon>
        </IconButton>
        <SimplePopover onClose={HandleExpand} anchorEl={popAnchor} content={listMain} />
      </span>
    </>
  );
}

function TableActions(props) {
  function Retire() {
    props.onRetire(props.id);
  }

  function Delete() {
    props.onDelete(props.id);
  }

  function RetireButton(props) {
    if (props.status == "ACTIVE") {
      return (
        <IconButton aria-label="retire" onClick={Retire}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>);
    }
    else if (props.status == "RETIRED") {
      return (
        <IconButton aria-label="unretire" onClick={Retire}>
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>);
    }
    else { return (<></>) }
  }

  return (
    <>
      <Link to={"/edit/" + props.id}>
        <IconButton aria-label="edit">
          <EditIcon fontSize="small" />
        </IconButton>
      </Link>
      <RetireButton status={props.status}></RetireButton>
      <IconButton aria-label="delete" onClick={Delete}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </>
  );
}

export { SimpleTable };