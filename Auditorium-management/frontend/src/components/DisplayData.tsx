import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import {
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import classes from "./DisplayData.module.css";

export const DisplayData: React.FC<{ cities; selected }> = (props) => {
  const [headers, setHeaders] = useState([] as any);
  const [filteredData, setFilteredData] = useState([] as any);

  const appData: any = useSelector((state) => state);

  useEffect(() => {
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
  }, [appData]);

  useEffect(() => {
    setFilteredData([]);
    const apiData: any[] = appData.stadiumList.stadiumData;
    let citiesList: any = [];
    apiData.map((object) =>
      Object.keys(object).map((values) =>
        props.cities.map((city) => {
          city.value === object[values].CityName &&
            citiesList.push(object[values]);
        })
      )
    );
    setFilteredData(citiesList);
  }, [props.cities]);
  return (
    <React.Fragment>
      {filteredData.length > 0 ? (
        <Table hover>
          <thead>
            <tr>
              <th>City</th>
              {headers.map((value, index) => (
                <th key={index}>
                  <span style={{ color: "lightGrey" }}>|</span> &nbsp;
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
                        ></span>{" "}
                        &nbsp;
                        {values[keys]}
                      </span>
                    </td>
                  ) : (
                    keys === "calibration" &&
                    values["calibration"].map((calbs) =>
                      calbs["status"] === "Not Run" ? (
                        <td style={{ color: "grey" }}>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          <span
                            onClick={() =>
                              props.selected(values["CityName"], calbs)
                            }
                          >
                            {" "}
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
                              <AiOutlineCheckCircle /> &nbsp;
                              <span style={{ color: "black" }}>
                                {" "}
                                {calbs["passed"]}
                              </span>{" "}
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
