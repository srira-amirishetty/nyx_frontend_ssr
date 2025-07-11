import type { Meta, StoryObj } from '@storybook/react';
import React from "react";

import ColorFullCircle from './ColorFullCircle';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/ColorFullCircle',
  component: ColorFullCircle,
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
} satisfies Meta<typeof ColorFullCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Base Button",
  },
};

export const PrimaryActive: Story = {
  args: {
    children: "Base Button",
    isActive: true,
  },
};

export const PrimaryError: Story = {
  args: {
    children: "Base Button",
    isError: true,
  },
};

export const PrimaryLoading: Story = {
  args: {
    children: "Base Button",
    isLoading: true,
  },
};

export const PrimaryNoBorder: Story = {
  args: {
    children: "Base Button",
    hasBorder: false,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    children: "Base Button",
    isDisabled: true,
  },
};


/*
export const PrimaryNormal: Story = {
  args: {
    children: "Normal Button",
    size: "normal",
  },
};

export const PrimaryMedium: Story = {
  args: {
    children: "Medium Button",
    size: "medium"
  },
};

export const PrimaryBlackBg: Story = {
  args: {
    children: "Medium Button",
    size: "medium"
  },
  parameters: {
    backgrounds: { default: 'black' },
  }
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    size: "normal",
    intent: "secondary"
  },
};

export const SecondaryWhiteBg: Story = {
  args: {
    children: "Secondary Button",
    size: "normal",
    intent: "secondary"
  },
  parameters: {
    backgrounds: { default: 'white' },
  }
};
*/