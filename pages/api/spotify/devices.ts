// Credit: https://github.com/leerob/leerob.io/blob/main/pages/api/now-playing.ts
import { getDevices } from '../../../lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await getDevices();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ devices: false });
  }

  const devices = await response.json();
  console.log({ devices })

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30',
  );

  return res.status(200).json({
    devices
  });
}