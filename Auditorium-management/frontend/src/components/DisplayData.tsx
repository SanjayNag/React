import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import {
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import classes from "./DisplayData.module.css";
import * as _ from "lodash";
import { RootState } from "../store/Store";
import filterData from "../store/DataSlice";

export const DisplayData: React.FC<{ cities; selected; selectedDateRange }> = (
  props
) => {
  const [headers, setHeaders] = useState([] as any);
  const [filteredData, setFilteredData] = useState([] as any);

  const appData: any = useSelector((state: RootState) => state);

  const filterData: any = useSelector((state: RootState) => state.dateTimeData);

  const usePreviousVal = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };

  const prevAppData = usePreviousVal(appData);

  const prevPropsCities: any = usePreviousVal(props.cities);

  const prevDateRange: any = usePreviousVal(props.selectedDateRange);

  useEffect(() => {
    if (appData !== prevAppData) {
      const apiData: any[] = appData.stadiumList.stadiumData;
      let stadiums: any = [];
      apiData.map((object) =>
        Object.keys(object).map((values) =>
          object[values].calibration.map(
            (object) =>
              stadiums.indexOf(object.name) === -1 && stadiums.push(object.name)
          )
        )
      );
      setHeaders(stadiums);
    }
  }, [appData]);

  useEffect(() => {
    if (props.selectedDateRange.length === 0 && props.cities.length > 0) {
      setFilteredData([]);
      const apiData: any[] = appData.stadiumList.stadiumData;
      let citiesList: any = [];
      apiData.length > 0 &&
        apiData.map((object) =>
          Object.keys(object).map((values) =>
            props.cities.map((city) => {
              city.value === object[values].CityName &&
                citiesList.push(object[values]);
            })
          )
        );
      console.log(citiesList);
      setFilteredData(citiesList);
    }
  }, [props.cities]);

  useEffect(() => {
    if (props.cities.length === 0 && props.selectedDateRange.length > 0) {
      const apiData: any[] = appData.stadiumList.dateTimeData;
      if (!_.isEqual(prevDateRange, props.selectedDateRange)) {
        if (
          props.selectedDateRange !== undefined &&
          props.selectedDateRange.length > 0
        ) {
          let citiesList: any = [];
          apiData.map((object) => {
            Object.values(object).map((values) => {
              citiesList.push(values);
            });
          });
          setFilteredData(citiesList);
          console.log(citiesList);
        }
      }
    }
  }, [props.selectedDateRange]);

  useEffect(() => {
    if (props.cities.length > 0 && props.selectedDateRange.length > 0) {
      const apiData: any[] = appData.stadiumList.dateTimeData;

      if (
        props.selectedDateRange !== undefined &&
        props.selectedDateRange.length > 0
      ) {
        let citiesList: any = [];
        apiData.map((object) => {
          Object.values(object).map((values) => {
            citiesList.push(values);
          });
        });
        let filteredCitiList: any = [];
        citiesList.map((object) => {
          props.cities.map((cities) => {
            cities.value === object.CityName && filteredCitiList.push(object);
          });
        });
        setFilteredData(filteredCitiList);
      }
    }
    if (props.cities.length === 0 && props.selectedDateRange.length === 0)
      setFilteredData([]);
  }, [props.cities, props.selectedDateRange]);

  return (
    <React.Fragment>
      {filteredData.length > 0 ? (
        <Table hover>
          <thead>
            <tr>
              <th>City</th>
              {headers.map((value, index) => (
                <th key={index}>
                  <span style={{ color: "lightGrey" }}>|</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ borderTop: "lightGrey" }}>
            {filteredData.map((values, index) => (
              <tr key={index}>
                {Object.keys(values).map((keys) =>
                  keys === "CityName" ? (
                    <td key={keys}>
                      <span>
                        <span
                          className={
                            values["SuccessRate"] >= 75 &&
                            values["SuccessRate"] <= 100
                              ? classes.success
                              : values["SuccessRate"] >= 50 &&
                                values["SuccessRate"] <= 75
                              ? classes.aboveAvg
                              : values["SuccessRate"] >= 25 &&
                                values["SuccessRate"] <= 50
                              ? classes.avg
                              : classes.fail
                          }
                        ></span>
                        &nbsp;
                        {values[keys]}
                      </span>
                    </td>
                  ) : (
                    keys === "calibration" &&
                    values["calibration"].map((calbs) =>
                      calbs["status"] === "Not Run" ? (
                        <td style={{ color: "grey" }}>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span
                            onClick={() =>
                              props.selected(values["CityName"], calbs)
                            }
                          >
                            <AiOutlineMinusCircle />
                          </span>
                        </td>
                      ) : (
                        <td>
                          {calbs["failed"] > 0 && calbs["passed"] > 0 ? (
                            <span
                              style={{ color: "rgb(81, 255, 1)" }}
                              onClick={() =>
                                props.selected(values["CityName"], calbs)
                              }
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <AiOutlineCheckCircle /> &nbsp;
                              <span style={{ color: "black" }}>
                                {calbs["passed"]}
                              </span>
                              &nbsp;
                              <span
                                style={{ color: "red" }}
                                onClick={() =>
                                  props.selected(values["CityName"], calbs)
                                }
                              >
                                <AiOutlineCloseCircle /> &nbsp;
                                <span style={{ color: "black" }}>
                                  {calbs["failed"]}
                                </span>
                              </span>
                            </span>
                          ) : calbs["failed"] > 0 ? (
                            <span
                              style={{ color: "red" }}
                              onClick={() =>
                                props.selected(values["CityName"], calbs)
                              }
                            >
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <AiOutlineCloseCircle /> &nbsp;
                              <span style={{ color: "black" }}>
                                {calbs["failed"]}
                              </span>
                            </span>
                          ) : (
                            calbs["passed"] > 0 && (
                              <span
                                style={{ color: "rgb(81, 255, 1)" }}
                                onClick={() =>
                                  props.selected(values["CityName"], calbs)
                                }
                              >
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <AiOutlineCheckCircle /> &nbsp;
                                <span style={{ color: "black" }}>
                                  {calbs["passed"]}
                                </span>
                              </span>
                            )
                          )}
                        </td>
                      )
                    )
                  )
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <span className={classes.noData}> No Data found</span>
      )}
    </React.Fragment>
  );
};
