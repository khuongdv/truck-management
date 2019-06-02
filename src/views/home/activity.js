import React from 'react'
import './layout.scss'
import dayjs from "dayjs";

function SingleActivity(props) {
  return (
    <div className="single-activity-wrapper">
      <div
        className={props.action === 'delete' ? "text-danger font-weight-bold" : "text-primary font-weight-bold"}>{props.name}</div>
      <div style={{fontSize: 11}}><i className="fa fa-clock-o" style={{marginRight: 4}}/>
        {dayjs(props.time).format('hh:mm:ss DD/MM/YYYY')}</div>
    </div>
  )
}

export default SingleActivity
