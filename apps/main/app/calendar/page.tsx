import type { Metadata } from "next";
import { calenderMeta } from "@nyx-frontend/main/utils/metas";

export const metadata: Metadata = {
  title: calenderMeta.title,
  description: calenderMeta.description,
};

import CalendlyEmbed from "../../components/CalendlyEmbed";

export default function Home() {
  return (
    <CalendlyEmbed url="https://calendly.com/nyx-scheduler/expert-call-with-vinay" />
  );
}
