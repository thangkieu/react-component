// FBShare.stories.tsx
import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { MobileCameraAccess as MobileCameraAccessCmp } from '../modules/MobileCameraAccess';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'MobileCameraAccess',
  component: MobileCameraAccessCmp,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof MobileCameraAccessCmp>> = (
  args
) => <MobileCameraAccessCmp {...args} />;

export const MobileCameraAccess = Template.bind({});

MobileCameraAccess.args = {
  /*👇 The args you need here will depend on your component */
};
