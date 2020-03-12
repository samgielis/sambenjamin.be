import React from 'react';
import { Story } from '../../model/Story';
import {StoryGrid} from './children/StoryGrid';
import { Author } from '../../model/Author';
import './HomePage.css';

export type HomePageProps = {
    stories: Story[];
    author: Author;
}



export function HomePage(props: HomePageProps) {
  
    return (
        <div className="homepage">
            <h1>{props.author.name}</h1>
            <StoryGrid stories={props.stories}></StoryGrid>
        </div>
    );
}

