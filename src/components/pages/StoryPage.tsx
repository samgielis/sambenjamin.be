import React from 'react';
import { Story } from "../model/Story";

export type StoryPageProps = {
    story: Story;
}

function StoryPage(props: StoryPageProps) {
  return (<h6>{props.story.title}</h6>);
}

export default StoryPage;