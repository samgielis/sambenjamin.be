import React from 'react';
import { Story, getStoryCoverImageURL } from "../../../model/Story";
import { Author } from "../../../model/Author";
import { Container, Button } from 'react-bootstrap';
import './StoryCover.css';
import { Link } from 'gatsby';
import {StoryDate} from "../../../shared/StoryDate";

export type StoryCoverProps = {
    story: Story,
    author: Author
}

export function StoryCover(props: StoryCoverProps) {
    const titles = [];
    titles.push(<h1>{props.story.title}</h1>);

    if (props.story.subTitle) {
        titles.push(<h2>{props.story.subTitle}</h2>);
    }

    if (props.story.instaHandle) {
        titles.push(
            <Button variant="outline-light" href={`https://instagram.com/${props.story.instaHandle}`}>
                @{props.story.instaHandle}
            </Button>
        );
    }

    return (
        <div className="story-cover">

            <Container className="d-flex flex-column align-items-center ">
                <div className="cover-photo" style={{ backgroundImage: `url("${getStoryCoverImageURL(props.story)}")` }}>
                </div>
                <div className="story-title-wrapper align-self-center align-items-center">
                    {titles}
                </div>
                <div className="author-details">
                    <div>
                        <span>By <Link className="author-name" to={'/'}>{props.author.name}</Link></span>
                    </div>
                    <StoryDate date={props.story.date}></StoryDate>
                </div>
            </Container>
        </div>
    );
}