import React from 'react';
import { Story, getStoryCoverImageURL } from "../../../model/Story";
import { Container, Row, Col } from 'react-bootstrap';
import './StoryCover.css';
import { Link } from 'react-router-dom';
import { getNameOfMonth, getDateOrdinal } from '../../../util/Utils';

export type StoryCoverProps = {
    story: Story
}

export function StoryCover(props: StoryCoverProps) {
    const date = new Date(props.story.date);
    return (
        <div className="story-cover">

            <Container className="d-flex flex-column align-items-center ">
                <div className="cover-photo" style={{ backgroundImage: `url("${getStoryCoverImageURL(props.story)}")` }}>
                </div>
                <div className="story-title-wrapper align-self-center align-items-center">
                    <h1>{props.story.title}</h1>
                    <h2>{props.story.subTitle}</h2>
                </div>
                <div className="author-details">
                    {/*<Link to={"/"}>
                        <img alt="Author portrait" src="/profile.png"></img>
    </Link>*/}
                    <div>
                        <span>By <Link className="author-name" to={'/'}>Sam Benjamin</Link></span>
                    </div>
                    <div className="post-date">
                        {getNameOfMonth(date)} {date.getDate()}<sup>{getDateOrdinal(date)}</sup>, <span>{date.getFullYear()}</span>
                    </div>
                </div>
            </Container>
        </div>
    );
}