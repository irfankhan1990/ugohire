import type { NextApiRequest, NextApiResponse } from "next";
import apiConnector from "@metajob/api-connector";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // console.log("Received GET request:", req.query);

    const connect = await apiConnector;
    await connect.connectDB();

    const jobResult = await connect.getSearchJobs(req.query);
    // console.log("jobResults ",jobResult)

    res.status(200).send({
      message: "Successfully fetched all searched jobs",
      data: jobResult,
    });
  } catch (e: any) {
    res.status(500).send({
      message: e.message,
      error: "Server Error",
    });
  }
}

