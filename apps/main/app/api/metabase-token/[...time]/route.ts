import jwt from "jsonwebtoken";

const METABASE_SITE_URL = "https://reports.nyx.today";
const METABASE_SECRET_KEY =
  "6d05358d0b86819da59c55c63767df8df1154c2715f77b6995f1bcb3089625f6";

export async function GET(request: Request) {
  const data = new URL(request.url);
  const time = data.pathname.replace(/\/api\/metabase-token\//, '');
  const payload = {
    resource: { dashboard: 143 },
    params: {},
    exp: Number(time), // 10 minute expiration
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY);
  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#theme=night&#bordered=true&titled=true`;
  return Response.json({ url: iframeUrl });
}
