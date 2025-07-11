import axe from "axe-core";
import { render } from "@testing-library/react";
import { test, expect } from "vitest";

import ArticleIcon from "../ArticleIcon";
import AssetsIcon from "../AssetsIcon";
import BrandVisionAIIcon from "../BrandVisionAIIcon";
import CheckedIcon from "../CheckedIcon";
import CollapsIcon from "../CollapsIcon";
import HelpIcon from "../HelpIcon";
import HomeIcon from "../HomeIcon";
import IntegrationsIcon from "../IntegrationsIcon";
import Logo from "../Logo";
import LogoutIcon from "../LogoutIcon";
import LogOutNewIcon from "../LogOutNewIcon";
import LyricGeniusAIIcon from "../LyricGeniusAIIcon";
import NewHomeIcon from "../NewHomeIcon";
import PlayIcon from "../PlayIcon";
import SettingsIcon from "../SettingsIcon";
import SonicAIIcon from "../SonicAIIcon";
import UploadIcon from "../UploadIcon";
import UsersIcon from "../UsersIcon";
import VideosIcon from "../VideosIcon";
import VideoVistaAIIcon from "../VideoVistaAIIcon";

const Icons: React.FC<{ className: string }> = (props) => {
  return (
    <div className="flex gap-4">
      <ArticleIcon {...props} />
      <AssetsIcon {...props} />
      <BrandVisionAIIcon {...props} />
      <CheckedIcon {...props} />
      <CollapsIcon {...props} />
      <HelpIcon {...props} />
      <HomeIcon {...props} />
      <IntegrationsIcon {...props} />
      <Logo {...props} />
      <LogoutIcon {...props} />
      <LogOutNewIcon {...props} />
      <LyricGeniusAIIcon {...props} />
      <NewHomeIcon {...props} />
      <PlayIcon {...props} />
      <SettingsIcon {...props} />
      <SonicAIIcon {...props} />
      <UploadIcon {...props} />
      <UsersIcon {...props} />
      <VideosIcon {...props} />
      <VideoVistaAIIcon {...props} />
    </div>
  );
};

test("Accessibility check::Products", async () => {
  const { container } = render(<Icons className="w-7 h-7 text-white fill-current" />);
  const results = await axe.run(container);
  expect(results.violations.length).toBe(0);
});
