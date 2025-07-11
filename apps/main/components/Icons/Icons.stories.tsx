import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import ArticleIcon from './ArticleIcon';
import AssetsIcon from './AssetsIcon';
import BrandVisionAIIcon from './BrandVisionAIIcon';
import CheckedIcon from './CheckedIcon';
import CollapsIcon from './CollapsIcon';
import HelpIcon from './HelpIcon';
import HomeIcon from './HomeIcon';
import IntegrationsIcon from './IntegrationsIcon';
import Logo from './Logo';
import LogoutIcon from './LogoutIcon';
import LogOutNewIcon from './LogOutNewIcon';
import LyricGeniusAIIcon from './LyricGeniusAIIcon';
import NewHomeIcon from './NewHomeIcon';
import PlayIcon from './PlayIcon';
import SettingsIcon from './SettingsIcon';
import SonicAIIcon from './SonicAIIcon';
import UploadIcon from './UploadIcon';
import UsersIcon from './UsersIcon';
import VideosIcon from './VideosIcon';
import VideoVistaAIIcon from './VideoVistaAIIcon';

const PlayGround: React.FC = (props) => {
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
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Icons',
  component: PlayGround,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    backgrounds: { default: 'nyx' },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    
  },
} satisfies Meta<typeof PlayGround>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    className: "w-7 h-7 text-white fill-current",
  },
};

export const PrimaryYellow: Story = {
  args: {
    className: "w-7 h-7 text-nyx-yellow fill-current",
  },
};

export const PrimaryBlue: Story = {
  args: {
    className: "w-7 h-7 text-nyx-blue fill-current",
  },
};