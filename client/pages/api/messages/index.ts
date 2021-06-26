import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/Message";
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
        const user = await User.find({});
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      // case 'POST':
      //   try {
      //     const user = await User.create(
      //       req.body
      //     ) /* create a new model in the database */
      //     res.status(201).json({ success: true, data: user })
      //   } catch (error) {
      //     res.status(400).json({ success: false })
      //   }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
