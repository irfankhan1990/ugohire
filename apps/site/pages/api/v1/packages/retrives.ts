import apiConnector from "@metajob/api-connector";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();

  switch (req.method) {
    case "GET":
      try {
        const connect = await apiConnector;
        const packages = await connect.getPackages();

        res.status(200).send({
          message: "Successfully fetched all packages",
          data: packages,
        });
      } catch (e: any) {
        res.status(500).send({
          message: e.message,
          error: "Server Error",
        });
      }
      break;
    case "POST":
      try {
        const connect = await apiConnector;
        const session = await unstable_getServerSession(req, res, authOptions);

        const { headers } = req as any;
        const accessToken = await headers.authorization?.substring(
          7,
          headers.authorization.length
        );

        if (!accessToken && !session?.user.accessToken) {
          res.status(401).send({
            message: "User not authenticated",
            error: "Server Error",
          });
          return;
        }

        const reqQuery = {
          accessToken: session?.user.accessToken
            ? session?.user.accessToken
            : accessToken,
          body: req.body,
        };

        const packageResult = await connect.createPackage(reqQuery);

        res.status(200).send({
          message: "Package created successfully",
        });
      } catch (e: any) {
        res.status(500).send({
          message: e?.message || "Server Error",
          error: e.message,
        });
      }
  }
}
