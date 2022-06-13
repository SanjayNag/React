import React, { useState, useEffect, useRef } from "react";
import { DateRangePicker, CheckPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import classes from "./DateCityFilter.module.css";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Checkbox } from "rsuite";
import { useDispatch } from "react-redux";
import { setDateTimeFilteredData } from "../store/DataSlice";
import { callDateRangeFilterData } from "../services/Services";

export const DateCityFilter: React.FC<{ getSelectedCities }> = (props) => {
  const [cities, setCities] = useState([] as any);
  const [selectedCities, setSelectedCities] = useState([] as any);
  const [dateRange, setDateRange] = useState([] as any);
  const [checked, setChecked] = useState(Boolean);

  const dispatch = useDispatch();

  const { allowedMaxDays, allowedDays, allowedRange, beforeToday, afterToday } =
    DateRangePicker;

  const appData: any = useSelector((state) => state);

  const usePreviousVal = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };

  const prevAppData = usePreviousVal(appData.stadiumList.stadiumData);

  useEffect(() => {
    if (prevAppData !== appData.stadiumList.stadiumData) {
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
      props.getSelectedCities(filteredCities, []);
    }
  }, [appData]);

  const handleChangePickerChange = (value) => {
    setSelectedCities(value);
    props.getSelectedCities(
      value.length === 0
        ? []
        : value.map((city) => ({ label: city, value: city })),
      dateRange
    );
  };

  const handleCheckAll = (value, checked) => {
    setSelectedCities(checked ? cities.map((city) => city.value) : []);
    setChecked(checked);
    props.getSelectedCities(
      checked
        ? cities.map((city) => ({ label: city.value, value: city.value }))
        : [],
      dateRange
    );
  };

  const handleDateRangeChangePicker = async (dateRange: [Date, Date]) => {
    console.log(dateRange);
    setDateRange(dateRange);
    const response = await callDateRangeFilterData(dateRange);
    response.length > 0 && dispatch(setDateTimeFilteredData(response));

    props.getSelectedCities(
      selectedCities.map((city) => ({ label: city, value: city })),
      dateRange.length > 0 ? dateRange : []
    );
  };

  const handleCleanDateRangeChangePicker = (event) => {
    setDateRange([]);
    props.getSelectedCities(
      selectedCities.map((city) => ({
        label: city,
        value: city,
      })),
      []
    );
  };

  const changeBackgroundColor = (event) => {
    event.target.style.boxShadow = "0 0 0 0";
    event.target.style.borderColor = "#e5e5e5";
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
          <Row
            onMouseOver={changeBackgroundColor}
            onClick={changeBackgroundColor}
          >
            <Col xs={11}>
              <DateRangePicker
                format="yyyy-MM-dd hh:mm aa"
                showMeridian
                onOk={handleDateRangeChangePicker}
                onClean={handleCleanDateRangeChangePicker}
                disabledDate={afterToday?.()}
                placeholder="2022-06-22 06:52 PM ~ 2022-06-23 06:52 PM"
              />
              &nbsp; &nbsp;
              <CheckPicker
                data={cities}
                className={classes.optionPicker}
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
