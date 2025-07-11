import fs from "fs/promises";

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await fs.stat("counts.txt");
    const data = await fs.readFile("counts.txt", { encoding: "utf8" });
    const inc = getRandomInt(1, 20);
    await fs.writeFile("counts.txt", `${Number(data) + inc}`);
    return Response.json({ counts: data });
  } catch (error) {
    await fs.writeFile("counts.txt", "10");
    return Response.json({ counts: 10 });
  }
}
