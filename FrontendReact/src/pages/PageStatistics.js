import React, { useState, useEffect } from "react";

function PageStatistics(props) {
  const [shouldRefresh, setShouldRequest] = useState(0);
  useEffect(() => {
    let reqParam = {
      "SearchParam": "",
      "Status": ""
    };

    async function fetchData() {
      const res = await fetch("https://[REDACTED]/Api/GetDayRecords", {
        method: 'POST',
        body: JSON.stringify(reqParam),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      res.json()
        .then(res => { console.log(res); })
        .catch(err => console.log(err));
    }

    fetchData();
  }, [shouldRefresh]);

  return (<h3>Placeholder page</h3>);
}

export { PageStatistics };