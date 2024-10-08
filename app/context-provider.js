'use client'
 
import { createContext } from 'react'
import { useEffect, useState } from "react";
import { getStreak, getUserActivity } from "@/app/_libs/userData";
import { checkForSuccess } from '@/app/_libs/ApiClient';
import { generateProgram, readProgram, saveProgram } from '@/app/_libs/clientCrud';
import { getActivityPerDate } from '@/app/_libs/userData';
import { readAllExercises, readDiscreetness, readMovements } from './_libs/exerciseData';
import { isSameDate } from './_libs/dataProcessing';
import { timeSeries } from './_libs/TimeSeries';

/* 
This file retrieves server data than can be accessed by child components. 
This allows sibling pages to have access to the same data.
*/

export const DataContext = createContext({});
 
export default function DataProvider({ children }) {
  const [userObject, setUserObject] = useState(null);
  const [streakValue, setStreakValue] = useState({
    id: 'dummyId', 
    consecutive_days: 0
  });
  const [recentSessions, setRecentSessions] = useState([]);
  const [activityArray, setActivityArray] = useState();
  const [programArray, setProgramArray] = useState(null);
  const [placeholderText, setPlaceholderText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [discreetnessArray, setDiscreetnessArray] = useState(null);
  const [movements, setMovements] = useState(null);
  const [exercisesArray, setExercisesArray] = useState(null);
  const [discreetnessMapping, setDiscreetnessMapping] = useState(null);
  const [allActivities, setAllActivities] = useState(null);

  const context = {
    userObject: userObject,
    setUserObject: setUserObject,
    streakValue: streakValue,
    recentSessions: recentSessions,
    activityArray: activityArray,
    programArray: programArray,
    allActivities: allActivities, 
    setProgramArray: setProgramArray,
    setAllActivities: setAllActivities,
    placeholderText: placeholderText,
    discreetnessArray: discreetnessArray,
    movements: movements, 
    exercisesArray: exercisesArray,
    discreetnessMapping: discreetnessMapping
  }
  
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userDetails'));
    setUserObject(storedUserInfo);
    const userId = storedUserInfo.id
    loadStreak(userId);
    loadActivity(userId);
    loadProgram(userId);
    loadAllActivity(userId);
    getDiscreetness();
    getAllExercises();
    getMovements();
  }, []);

  async function loadStreak(userId) {
    const streakResponse = await getStreak(userId);
    if (checkForSuccess(streakResponse)) {
      setStreakValue(streakResponse);
    }
  }

  async function loadActivity(userId) {
    const activityResponse = await getActivityPerDate(userId);
    if (checkForSuccess(activityResponse)) {
      setActivityArray(activityResponse);
      const pastWeekSessions = activityResponse.filter(activity => activity.date > timeSeries.nDaysAgoDate(7));
      setRecentSessions(pastWeekSessions);
      if (
        !isSameDate(new Date(activityResponse[0].date), new Date())
      ) {
        // reset the value if the most recent session is not today
        sessionStorage.setItem('sessionActivityCount', 0);
      } 
    }
  }

  async function  loadProgram (userId) {
    const storedProgramResponse = await readProgram(userId);
    if (checkForSuccess(storedProgramResponse)) {
      const storedProgram = JSON.parse(storedProgramResponse.exercises);
      setProgramArray(storedProgram);
    } else {
      setPlaceholderText('Creating your program...');
      getNewProgram(userId);
    }
  }

  async function  getNewProgram (userId) {
    const createProgramResponse = await generateProgram();
    if (checkForSuccess(createProgramResponse)) {
      setProgramArray(createProgramResponse);
      const postProgramResponse = await saveProgram(
        userId, 
        createProgramResponse
      );
    } else {
    }
  }

  async function loadAllActivity(userId) {
    const userActivityResponse = await getUserActivity(userId);
    if (checkForSuccess(userActivityResponse)) {
      setAllActivities(userActivityResponse);
    }
  }

  async function getDiscreetness() {
    const discreetnessResponse = await readDiscreetness();
    if (checkForSuccess(discreetnessResponse)) {
      setDiscreetnessArray(discreetnessResponse);
      
      // Create a mapping object for easier lookup
      const discreetnessMappingObject = {};
      for (let i = 0; i < discreetnessResponse.length; i++) {
        const { level, description } = discreetnessResponse[i];
        discreetnessMappingObject[level] = description;
      }
      setDiscreetnessMapping(discreetnessMappingObject);
    }
  }

  async function getAllExercises() {
    const exercisesResponse = await readAllExercises();
    if (checkForSuccess(exercisesResponse)) {
      setExercisesArray(exercisesResponse);
    }
  }

  async function getMovements() {
    const movementsResponse = await readMovements();
    if (checkForSuccess(movementsResponse)) {
      setMovements(movementsResponse);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return;
  }
  
  return (
    <DataContext.Provider value={context}>
      {children}
    </DataContext.Provider>

  )
}