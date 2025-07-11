import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Base Button",
    size: "small",
  },
};

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