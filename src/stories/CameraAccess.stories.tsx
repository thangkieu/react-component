// FBShare.stories.tsx
import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { CameraAccess as CameraAccessCmp } from '../modules/CameraAccess';

//๐ This default export determines where your story goes in the story list
export default {
  title: 'CameraAccess',
  component: CameraAccessCmp,
} as Meta;

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story<ComponentProps<typeof CameraAccessCmp>> = (args) => (
  <CameraAccessCmp {...args} />
);

export const CameraAccess = Template.bind({});

CameraAccess.args = {
  /*๐ The args you need here will depend on your component */
  width: 500,
  height: 300,
};
