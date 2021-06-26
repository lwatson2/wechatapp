import dbConnect from "../../../utils/dbConnect";
import Message from "../../../models/Message";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { group } = req.query;
        console.log(`req`, group);

        Message.find({ group }).then((messagesData) =>
          res.json({ messagesData })
        );
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
