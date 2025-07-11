import type { Meta, StoryObj } from '@storybook/react';

import Steper from './Steper';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Text To Image/Steper',
  component: Steper,
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
} satisfies Meta<typeof Steper>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Branding: Story = {
  args: {
    tab: "branding",
    isGenerateButtonDisabled: false
  },
};

export const Camaign: Story = {
  args: {
    tab: "camaign",
    isGenerateButtonDisabled: false
  },
};

export const Media: Story = {
  args: {
    tab: "media",
    isGenerateButtonDisabled: false
  },
};

export const Creative: Story = {
  args: {
    tab: "creative",
    isGenerateButtonDisabled: false
  },
};

export const GenerateButtonNotDisabled: Story = {
  args: {
    tab: "",
    isGenerateButtonDisabled: false
  },
};

export const GenerateButtonDisabled: Story = {
  args: {
    tab: "",
    isGenerateButtonDisabled: true
  },
};