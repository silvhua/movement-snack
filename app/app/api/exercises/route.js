import { NextResponse } from "next/server";
import sqlSelect from "@/app/_libs/utils";

export async function GET() {
    const query = `
    WITH randomized AS (
    select
      exercise.id, exercise.name,
      movement.name AS "movement category",
      ROW_NUMBER() OVER (PARTITION BY movement.name ORDER BY RAND()) AS random_number
    FROM exercise
    JOIN exercise_movement ON (exercise.id = exercise_id)
    JOIN movement ON (movement_id = movement.id)
    )
    -- SELECT FIRST_VALUE(random_number), 
    SELECT *
    FROM randomized
    WHERE random_number = 1
  `;
  try {
    let rows = await sqlSelect(query);
    console.log('rows in GET', rows)
    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}