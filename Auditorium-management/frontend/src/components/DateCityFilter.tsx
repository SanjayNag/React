import React, { useState, useEffect } from "react";
import { DateRangePicker, CheckPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import classes from "./DateCityFilter.module.css";
import { callGetData } from "../services/Services";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setStadiumDetails } from "../store/DataSlice";
import { Checkbox } from "rsuite";

export const DateCityFilter: React.FC<{ getSelectedCities }> = (props) => {
  const [cities, setCities] = useState([] as any);
  const [selectedCities, setSelectedCities] = useState([] as any);
  const dispatch = useDispatch();

  const appData: any = useSelector((state) => state);

  useEffect(() => {
    const getData = () => {
      callGetData().then((response) => dispatch(setStadiumDetails(response)));
    };
    getData();
  }, []);

  useEffect(() => {
    const apiData: any[] = appData.stadiumList.stadiumData;
    let extractedCities = apiData.map((object) =>
      Object.keys(object).map((values) => object[values].CityName)
    );
    let cities: any = [];
    Object.values(extractedCities).map((values) =>
      values.map((val) => cities.indexOf(val) === -1 && cities.push(val))
    );

    let filteredCities: any = [];
    cities.map((val) => filteredCities.push({ label: val, value: val }));

    setSelectedCities(cities);
    cities.length > 0 && setCities(filteredCities);
    props.getSelectedCities(filteredCities);
  }, [appData]);

  const handleChangePickerChange = (value) => {
    setSelectedCities(value);
    props.getSelectedCities(
      value.map((city) => ({ label: city, value: city }))
    );
  };

  const handleCheckAll = (value, checked) => {
    setSelectedCities(checked ? cities.map((city) => city.value) : []);
    props.getSelectedCities(
      checked
        ? cities.map((city) => ({ label: city.value, value: city.value }))
        : []
    );
  };

  return (
    <React.Fragment>
      <div className={classes.elementBackground}>
        <Row>
          <Col lg={3}>
            <span>Time :</span>
          </Col>
          <Col>
            <span>Audit :</span>
          </Col>
        </Row>

        <div className={classes.elementPosition}>
          <Row>
            <Col xs={11}>
              <DateRangePicker format="yyyy-MM-dd hh:mm aa" showMeridian />
              &nbsp; &nbsp;
              <CheckPicker
                data={cities}
                value={selectedCities}
                style={{ width: 224 }}
                onChange={handleChangePickerChange}
                renderExtraFooter={() => (
                  <Checkbox
                    inline
                    onChange={handleCheckAll}
                    indeterminate={
                      selectedCities.length > 0 &&
                      selectedCities.length < cities.length
                    }
                    checked={selectedCities.length === cities.length}
                  >
                    Check all
                  </Checkbox>
                )}
              ></CheckPicker>
            </Col>
          </Row>
        </div>
      </div>
      <br></br>
      <span className={classes.title}>Auditorium Management module</span>
    </React.Fragment>
  );
};
