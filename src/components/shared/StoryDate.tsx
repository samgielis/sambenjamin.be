import { getNameOfMonth, getDateOrdinal } from "../util/Utils";
import React from 'react';
import './StoryDate.css'

type StoryDateProps = {
    date: string
}

export function StoryDate(props: StoryDateProps) {
    const date = new Date(props.date);
    return <div className="story-date">
        {getNameOfMonth(date)} {date.getDate()}<sup>{getDateOrdinal(date)}</sup>, <span>{date.getFullYear()}</span>
    </div>
}