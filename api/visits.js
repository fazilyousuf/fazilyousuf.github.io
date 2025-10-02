import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const count = await kv.incr("visits");
    return res.status(200).json({ visits: count });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
