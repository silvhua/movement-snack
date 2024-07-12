import crypto from 'crypto';
import {apiSqlQuery} from "@/app/_libs/utils";
import { queryParamsToSql } from '@/app/_libs/dataProcessing';

export async function GET(request, { params }) {
  const userId = params.userId;
  const query = `
  SELECT
    MAX(id) AS id,
    MAX(last_edited_time) AS last_edited_time,
    MIN(created_time) AS created_time 
  FROM session
  WHERE (user = "${userId}")
  AND created_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
  GROUP BY DATE(created_time)
  `
  const response = await apiSqlQuery(query);
  return response;
}
