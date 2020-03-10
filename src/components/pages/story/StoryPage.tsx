import React from 'react';
import { Story } from "../../model/Story";
import {StoryCover} from "./children/StoryCover";
import {Author} from "../../model/Author";

export type StoryPageProps = {
    story: Story;
    author: Author;
}

function StoryPage(props: StoryPageProps) {
  return (<div className='story-page'>
    <StoryCover story={props.story} author={props.author}></StoryCover>
  </div>);
}

export default StoryPage;