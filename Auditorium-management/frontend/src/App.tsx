import { useEffect } from "react";
import "./App.css";
import { callGetData } from "./services/Services";
import { DateCityFilter } from "./components/DateCityFilter";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  useEffect(() => {
    callGetData().then((response) => console.log(response));
  }, []);

  return (
    <div className="App">
      <DateCityFilter />
      <br></br>
      <br></br>
      <Tabs defaultActiveKey="listView" id="uncontrolled-tab-example">
        <Tab eventKey="listView" title="List View">
          <span>No Data found</span>
        </Tab>
        <Tab eventKey="detailView" title="Detail View">
          <span>No Data found</span>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
