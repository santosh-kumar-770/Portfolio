import type { IncomingMessage, ServerResponse } from 'node:http';

type ExtendedRequest = IncomingMessage & {
  method?: string;
  query?: Record<string, string | string[]>;
};

type ExtendedResponse = ServerResponse & {
  status?: (statusCode: number) => ExtendedResponse;
  json?: (data: unknown) => void;
};

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // Helper to ensure compatibility with both Vercel and standard Node HTTP
  const sendJson = (statusCode: number, data: unknown) => {
    if (typeof res.status === 'function') {
      res.status(statusCode);
      if (typeof res.json === 'function') {
        res.json(data);
        return;
      }
    }
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(405, { error: 'Method Not Allowed' });
  }

  return sendJson(200, {
    status: 'ok',
    service: 'email-notifications',
    environment: 'vercel-serverless',
  });
}
