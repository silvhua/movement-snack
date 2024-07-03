import { loadJsonFile } from "../utils/utils.js";
import 'dotenv/config';
import { convertToSnakeCase, transformArrayValues } from "../utils/transformForSql.js";

const mainTableName = 'exercise';
const trackingObject = loadJsonFile('./utils/tracking.json');

function processData(notionDbName) {
  // Get the filename of the most updated JSON file
  const databaseId = process.env[notionDbName];
  const newestJsonFilename = trackingObject[databaseId].newest_json;

  // import data files (arrays of objects)
  let data = loadJsonFile(newestJsonFilename);
  data = convertToSnakeCase(data);
  const timestampKeys = ['last_edited_time', 'created_time'];
  data = transformArrayValues(data, timestampKeys);
  return data;
}

function createManyToManyObject(tableName, originalArray, arrayProperty) {
  /* 
  Create the many to many table for each pair of tables that has a many to many relationship
  */
  const expandedArray = [];
  for (let i = 0; i < originalArray.length; i++) {
    const currentObject = originalArray[i];
    const valueArray = currentObject[arrayProperty];
    for (let j = 0; j < valueArray.length; j++) {
      const relationObject = {};
      relationObject[`${tableName}_id`] = currentObject['id'];
      relationObject[`${arrayProperty}_id`] = valueArray[j];
      expandedArray.push(relationObject);
    }
  }
  return expandedArray;
}

const notionDbNames = Object.keys(process.env).filter(key => key.endsWith('_DATABASE'));

const allData = {}; // Object where each property contains all the data for a given table
notionDbNames.forEach(dbName => {
  const tableName = dbName.split('_DATABASE')[0].toLocaleLowerCase();
  allData[tableName] = processData(dbName);
})

// Create the one to many & many to many tables branching from `exercise` table
const oneToManyTables = [
  'movement', 'muscle', 'modifier', 'focus', 'condition', 'environment'
]

const multiselectProperties = ['environment'];
const arrayProperties = [...oneToManyTables, ...multiselectProperties];

const exerciseDataArray = allData[mainTableName];

arrayProperties.forEach(property => {
  allData[`${mainTableName}_${property}`] = createManyToManyObject(mainTableName, exerciseDataArray, property)
})

// Remove relation properties
allData[mainTableName] = allData[mainTableName].map(object => {
  const { muscle, movement, modifier, condition, discreetness, environment, focus, ...filteredObject } = object;
  return filteredObject;
})

// Process the `activity` seed data to take only the first element of the properties with array values
allData['activity'] = allData['activity'].map(object => {
  const arrayProperties = ['exercise', 'sessions'];
  arrayProperties.forEach(key => {
    object[`${key}_id`] = object[key][0];
  })
  return object;
})
allData['activity'] = allData['activity'].map(object => {
  const { exercise, sessions, ...filteredObject } = object;
  return filteredObject;
})

console.log(Object.keys(allData));

export async function seed(knex) {
  const allTables = Object.keys(allData);
  for (let i = 0; i < allTables.length; i++) {
    const table = allTables[i];
    console.log(`Seeding ${table}`);
    await knex(table).del();
    await knex(table).insert(allData[table]);
    console.log(allData[table]);
  }
}
