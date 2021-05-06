// FBShare.stories.tsx
import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { CameraAccess as CameraAccessCmp } from '../modules/CameraAccess';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'CameraAccess',
  component: CameraAccessCmp,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof CameraAccessCmp>> = (args) => (
  <CameraAccessCmp {...args} />
);

export const CameraAccess = Template.bind({});

CameraAccess.args = {
  /*👇 The args you need here will depend on your component */
  width: 500,
  height: 300,
};
