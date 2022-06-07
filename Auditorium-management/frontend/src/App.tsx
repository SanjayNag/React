import React, { useState, useEffect } from "react";
import { DateCityFilter } from "./components/DateCityFilter";
import { callGetData, callDateRangeFilterData } from "./services/Services";
import { DisplayData } from "./components/DisplayData";
import { Table, Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import classes from "./App.module.css";
import { useDispatch } from "react-redux";
import { setStadiumDetails, setDateTimeFilteredData } from "./store/DataSlice";

function App() {
  const [selectedCities, setSelectedCities] = useState([] as any);
  const [selectedData, setSelectedData] = useState([] as any);
  const [selectedCity, setSelectedCity] = useState("");
  const [key, setKey] = useState<string>("listView");
  const [dateRange, setDateRange] = useState([] as any);

  const dispatch = useDispatch();

  const handleSelectedCitiesProps = (values: any[], dateRange: any[]) => {
    setSelectedCities(values);
    setDateRange(dateRange);
  };

  const handleSelectedData = (cityName: string, values: any[]) => {
    setSelectedCity(cityName);
    setSelectedData(values);
    setKey("detailView");
  };

  useEffect(() => {
    const getData = () => {
      callGetData().then((response) => dispatch(setStadiumDetails(response)));
    };
    getData();
  }, []);

  return (
    <React.Fragment>
      <DateCityFilter getSelectedCities={handleSelectedCitiesProps} />
      <br></br>
      <br></br>
      <Tabs
        defaultActiveKey="listView"
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(key) => key !== null && setKey(key)}
      >
        <Tab eventKey="listView" title="List View">
          <DisplayData
            cities={selectedCities}
            selectedDateRange={dateRange}
            selected={handleSelectedData}
          />
        </Tab>
        <Tab eventKey="detailView" title="Detail View">
          {selectedData.length !== 0 ? (
            <Table striped>
              <thead>
                <tr>
                  <th>City</th>
                  {Object.keys(selectedData).map((headers) => (
                    <th>
                      {headers === "name"
                        ? "Name"
                        : headers === "failed"
                        ? "Cancelled"
                        : headers === "passed"
                        ? "Booked"
                        : headers === "recovered"
                        ? "Recovered"
                        : headers === "status"
                        ? "Status"
                        : headers !== "additional_data"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ borderColor: "lightgray" }}>
                <tr>
                  <td>{selectedCity}</td>
                  <td>{selectedData.name}</td>
                  <td>{selectedData.failed}</td>
                  <td>{selectedData.passed}</td>
                  <td>{selectedData.recovered}</td>
                  <td>{selectedData.status}</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <span className={classes.noData}>No Data found</span>
          )}
        </Tab>
      </Tabs>
    </React.Fragment>
  );
}

export default App;
