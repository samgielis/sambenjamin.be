import React from 'react';
import { Story } from '../../model/Story';
import { StoryGrid } from './children/StoryGrid';
import { Author } from '../../model/Author';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export type HomePageProps = {
    stories: Story[];
    author: Author;
}

export function HomePage(props: HomePageProps) {

    return (
        <div className="homepage">
            <Container style={{textAlign: "center", padding: "1rem"}}>
                <p><Link to={"/"}>
                    <img width="100px" alt="Author portrait" src="/profile.png"></img>
                </Link></p>
                <h1>{props.author.name}</h1>
                <Button href={props.author.url} variant="outline-dark">Follow @samgielis</Button>
            </Container>
            
            <StoryGrid stories={props.stories}></StoryGrid>
        </div>
    );
}

