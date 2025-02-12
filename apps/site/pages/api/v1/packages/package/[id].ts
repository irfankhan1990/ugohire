import { authOptions } from "@/pages/api/auth/[...nextauth]";
import apiConnector from "@metajob/api-connector";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

/**
 * Call API function to fetch Review Data.
 * @param {Object} options.
 * @returns {Object} Review Data.
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const connect = await apiConnector;
  // connect to database
  await connect.connectDB();

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
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
          packageId: id,
        };

        const packageResult = await connect.getSinglePackage(reqQuery);
        res.status(200).send({
          message: "Successfully fetched packege",
          data: packageResult,
        });
      } catch (e: any) {
        res.status(500).send({
          message: e.message,
          error: "Server Error",
        });
      }
      break;
    case "PUT":
      try {
        const connect = await apiConnector;
        const { id } = req.query;
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
          packageId: id,
          body: req.body,
        };

        const packageResult = await connect.updatePackage(reqQuery);

        res.status(200).send({
          message: "Successfully updated packege",
        });
      } catch (e: any) {
        res.status(500).send({
          message: e?.message || "Server Error",
          error: e.message,
        });
      }
      break;
    case "DELETE":
      try {
        const connect = await apiConnector;
        const { id } = req.query;
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
          packageId: id,
        };

        const packageResult = await connect.deletePackage(reqQuery);

        res.status(200).send({
          message: "Successfully deleted packege",
        });
      } catch (e: any) {
        res.status(500).send({
          message: e?.message || "Server Error",
          error: e.message,
        });
      }
      break;
  }
}
