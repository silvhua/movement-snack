"use client"

import { useState, useRef, useContext, useEffect } from "react";
import { DataContext } from "@/app/context-provider";
import UpcomingExercises from "@/app/_components/UpcomingExercises/UpcomingExercises";
import Placeholder from "@/app/_components/Placeholder/Placeholder";
import Button from "@/app/_components/Button/Button";
import FilterIcon from "@/app/_components/FilterIcon/FilterIcon";
import FilterMenu from "@/app/_components/FilterMenu/FilterMenu";
import {
  generateProgram, updateProgram
} from '@/app/_libs/clientCrud';
import { checkForSuccess } from '@/app/_libs/ApiClient';
import Streak from "@/app/_components/Streak/Streak";
import './dashboard.scss';
import LogoutButton from "@/app/_components/LogoutButton/LogoutButton";
import DownloadCsv from "@/app/_components/DownloadCsv/DownloadCsv";

export default function Dashboard() {
  const context = useContext(DataContext);
  const {
    userObject, 
    streakValue, 
    recentSessions, 
    programArray, setProgramArray,
    discreetnessArray
  } = context;

  useEffect(() => {
    const previousActivityCount = parseInt(
      sessionStorage.getItem('sessionActivityCount')
    );
  }, [])

  const [checkboxValues, setCheckboxValues] = useState({
    'context': {}
  })

  const filterRef = useRef();
  const userId = userObject?.id;

  if (!userObject) {
    return <Placeholder text='Verifying your details...' />
  }

  function handleFilterClick (event) {
    filterRef.current.showModal(); 
  }


  async function handleFilterSubmit(event) {
    event.preventDefault();

    let sqlFilterStatements = [];

    for (const [property, propertyOptionObject] of Object.entries(checkboxValues)) {
          
      let column;
      switch (property) {
        case 'discreetness':
          column = 'level';
          break;
        default:
          column = 'name';
      }
      for (const [option, value] of Object.entries(propertyOptionObject)) {
        if (value) {
          sqlFilterStatements.push(`(${property}.${column} LIKE "${option}")`)
        }
      }
    }

    // If both the high-heels and boots filters are selected, only apply the high-heels filter
    if (
      sqlFilterStatements.includes('(context.name LIKE "high-heels")') &&
      sqlFilterStatements.includes('(context.name LIKE "boots")')
    ) {
      sqlFilterStatements = sqlFilterStatements.filter(string => 
        string !== '(context.name LIKE "boots")'
      )
    }
    
    let filterString = sqlFilterStatements.join(' OR ');
    filterString = encodeURIComponent(filterString);
    const createProgramResponse = await generateProgram(filterString);
    if (checkForSuccess(createProgramResponse)) {
      setProgramArray(createProgramResponse);
      /* Save the newly generated program after filter form is submitted */
      const updateProgramResponse = await updateProgram(userId, createProgramResponse);
      if (createProgramResponse.length > 0) {
        if (checkForSuccess(updateProgramResponse)) {
          filterRef.current.close();
        }
      } else {
        console.log(`Problem generating program:\n`, updateProgramResponse)
      }
    } else {
      alert('Sorry! There was a problem saving your activity.')
    }
  }

  const filterProps = {
    filterRef: filterRef,
    onSubmit: handleFilterSubmit,
    checkboxValues: checkboxValues,
    setCheckboxValues: setCheckboxValues
  }

  const { id, username, first_name, last_name, password } = userObject;

  const csvMapping = {
    movement: "movement category",
    name: "exercise",
    id: "id"
  }
  return (
    <>
      <section className="responsive-section">
        <div className="title-container">
          <h1 className="heading2">Hi, {first_name}</h1>
          <p>Welcome to your dashboard</p>
        </div>
        <div className="flex-column-div">
          <h3 className="streak__text">
            <span className="streak__number">
              {streakValue.consecutive_days || "0"}
            </span> day streak 
          </h3>
          <Streak
            data={recentSessions}
            interval={7}
          />
        </div>
      </section>
      <section className="flex-row-container">
        <h2 className='headline6'>Upcoming Exercises</h2>
        <FilterIcon
          handleClick={handleFilterClick}
        />
      </section>
      <section>
      {
        programArray ? 
          <>
            <UpcomingExercises
              userObject={userObject}
              programArray={programArray}
              setProgramArray={setProgramArray}
            />
              <LogoutButton />
              <DownloadCsv
                data={programArray}
                fileName='movement_snack_program'
                appendTimestamp={true}
                csvMapping={csvMapping}
              />
              <FilterMenu filterProps={filterProps} />
            </>
            : null
        }
      </section>
    </>
  );
}
