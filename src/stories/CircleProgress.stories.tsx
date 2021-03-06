// FBShare.stories.tsx
import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { CircleProgress as CircleProgressCmp } from '../modules/CircleProgress';

//๐ This default export determines where your story goes in the story list
export default {
  title: 'CircleProgress',
  component: CircleProgressCmp,
} as Meta;

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story<ComponentProps<typeof CircleProgressCmp>> = (args) => (
  <CircleProgressCmp {...args} />
);

export const CircleProgress = Template.bind({});

CircleProgress.args = {
  /*๐ The args you need here will depend on your component */
  percentage: 90,
  width: 300,
  stroke: 16,
};
