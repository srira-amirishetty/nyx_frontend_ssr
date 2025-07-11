import axios from "axios";

const POWERBI_URL = "https://login.microsoftonline.com/1207d47d-5374-4d3e-a765-51583426fa49/oauth2/v2.0/token";
const CLIENT_SECRET = "oli8Q~hFzp1lqO2gLQ7WelWpHovKKUQfloRuRa~U";

export async function GET(request: Request) {
  const data = new URL(request.url);
  const time = data.pathname.replace(/\/api\/powerbi-token\//, '');
  console.log(time);
  const SCOPE = "https://analysis.windows.net/powerbi/api/.default";
  const CLIENT_ID = "4b4094ea-5c95-4dc4-9bbb-3cb6b6d74b87";
  const payload = `client_id=${CLIENT_ID}&scope=${encodeURIComponent(SCOPE)}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials&=`;
  const response = await axios({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: payload,
    url: POWERBI_URL,
  });
  return Response.json({ ...response.data });
}
