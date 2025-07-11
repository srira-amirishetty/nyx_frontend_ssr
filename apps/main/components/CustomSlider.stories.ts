import type { Meta, StoryObj } from '@storybook/react';
import React from "react";

import CustomSlider from './CustomSlider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/CustomSlider',
  component: CustomSlider,
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
} satisfies Meta<typeof CustomSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    value: 10,
    className: "w-[300px]"
  },
};

export const PrimaryFull: Story = {
  args: {
    value: 100,
    className: "w-[300px]"
  },
};

export const PrimaryHalf: Story = {
  args: {
    value: 50,
    className: "w-[300px]"
  },
};

export const PrimaryZero: Story = {
  args: {
    value: 0,
    className: "w-[300px]"
  },
};