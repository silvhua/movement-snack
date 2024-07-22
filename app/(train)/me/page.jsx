"use client"
import { useState, useRef, useContext } from "react";
import { DataContext } from "@/app/context-provider";

import ActivityCard from "@/app/_components/ActivityCard/ActivityCard";

const User = () => {
  const context = useContext(DataContext);
  const {
    activityArray, movements, exercisesArray, 
    programArray, setProgramArray
  } = context;

  console.log(activityArray)

  return (
    <section className="activity-list">
      <h1 className="heading1">
        My Activity History
      </h1>
      {activityArray.map(activity => <ActivityCard activityObject={activity}/>)}
    </section>
  )
}

export default User
