import React from 'react';
import { Story } from "../../model/Story";
import {StoryCover} from "./children/StoryCover";

export type StoryPageProps = {
    story: Story;
}

function StoryPage(props: StoryPageProps) {
  return (<div className='story-page'>
    <StoryCover story={props.story}></StoryCover>
  </div>);
}

export default StoryPage;