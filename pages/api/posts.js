import { NextApiRequest, NextApiResponse } from "next";
// import { Entries } from "../../global";

globalThis.entries = global.entries ?? [];

export function getEntries() {
  return globalThis.entries;
}
export function addEntry(entry) {
  globalThis.entries.push(entry);
}

export default function handler(req, res) {
  const { graphNumber, svgText } = req.body;
  addEntry({ graphNumber, svgText });

  res.status(200).json({ posts: getEntries() });
}
