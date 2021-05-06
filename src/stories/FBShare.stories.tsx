// FBShare.stories.tsx
import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { FBShare as FBShareCmp } from '../modules/FBShare';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'FBShare',
  component: FBShareCmp,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof FBShareCmp>> = (args) => (
  <FBShareCmp {...args} />
);

export const FBSharePhoto = Template.bind({});

FBSharePhoto.args = {
  /*👇 The args you need here will depend on your component */
  fbAppId: '559268918372459',
  photos: ['https://live.staticflickr.com/65535/51124674032_a2d954fdce_k.jpg'],
};

export const FBShareLink = Template.bind({});

FBShareLink.args = {
  /*👇 The args you need here will depend on your component */
  fbAppId: '559268918372459',
  link: 'https://google.com',
};
