import apiConnector from "@metajob/api-connector";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        const { token } = req.query;
        const connect = await apiConnector;
        const reqQuery = {
          accessToken: token,
        };
        const confirm = await connect.confirmEmail(reqQuery);

        res.status(200).send({
          message: "Successfully confirmed user email",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
  }
}
