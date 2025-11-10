"use client"
import { useState, useRef, useContext } from "react";
import { DataContext } from "@/app/context-provider";

import ActivityCard from "@/app/_components/ActivityCard/ActivityCard";
import DownloadCsv from "@/app/_components/DownloadCsv/DownloadCsv";
import { all } from "axios";
import { formatDate } from "@/app/_libs/dataProcessing";

const User = () => {
  const context = useContext(DataContext);
  const {
    allActivities
  } = context;
  const latestSessionTimestamp = formatDate(
    allActivities[0].created_time, 'filename', true);
  const csvMapping = {
    exercise: "exercise name",
    reps: "reps",
    duration: "duration",
    notes: "notes",
    local_time: "time"
  }
  return (
    <section className="activity-list" key='activity-list'>
      <h1 className="heading1" key='heading'>
        My Activity History
      </h1>
      <DownloadCsv
        data={allActivities}
        fileName={`activity_log_${latestSessionTimestamp}`}
        csvMapping={csvMapping}
      />
      <ActivityCard />
      {allActivities.map((activity, index) => <ActivityCard
        activityObject={activity}
        key={index}
        appendTimestamp={false}
      />)}
    </section>
  )
}

export default User
