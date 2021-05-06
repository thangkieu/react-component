// FBShare.stories.tsx
import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { RenderImageFromFile as RenderImageFromFileCmp } from '../modules/RenderImageFromFile';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'RenderImageFromFile',
  component: RenderImageFromFileCmp,
  argTypes: {
    file: { control: { type: 'file', accept: 'image/*' } },
  },
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof RenderImageFromFileCmp>> = (
  args
) => {
  let file = args.file;
  if (Array.isArray(args.file) && args.file.length > 0) file = args.file[0];

  return <RenderImageFromFileCmp {...args} file={file} />;
};

export const RenderImageFromFile = Template.bind({});

RenderImageFromFile.args = {
  /*👇 The args you need here will depend on your component */
  file: undefined,
};
