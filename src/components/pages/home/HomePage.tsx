import React from 'react';
import { Story } from '../../model/Story';
import { StoryGrid } from './children/StoryGrid';
import { Author } from '../../model/Author';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export type HomePageProps = {
    stories: Story[];
    author: Author;
}

export function HomePage(props: HomePageProps) {

    return (
        <div className="homepage">
            <Container style={{textAlign: "center"}}>
                <p><Link to={"/"}>
                    <img width="100px" alt="Author portrait" src="/profile.png"></img>
                </Link></p>
            </Container>
            
            <h1>{props.author.name}</h1>
            <StoryGrid stories={props.stories}></StoryGrid>
        </div>
    );
}

