import React from "react";
import { DateRangePicker, CheckPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import classes from "./DateCityFilter.module.css";
import { Col, Row } from "react-bootstrap";

export const DateCityFilter = () => {
  return (
    <React.Fragment>
      <div className={classes.elementBackground}>
        <Row>
          <Col xs={1}>
            <span>Time :</span>
          </Col>
          <Col xs={6}>
            <span>Audit :</span>
          </Col>
        </Row>

        <div className={classes.elementPosition}>
          <Row>
            <Col xs={11}>
              <DateRangePicker format="yyyy-MM-dd hh:mm aa" showMeridian />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp;&nbsp;
              <CheckPicker data={[]}></CheckPicker>
            </Col>
          </Row>
        </div>
      </div>
      <br></br>
      <span className={classes.title}>Auditorium Management module</span>
    </React.Fragment>
  );
};
