import React from "react";
import "./PhotoWrapper.css";
import { Photo } from "../../../model/Photo";
import { makeURL } from "../../../util/URLUtils";

type PhotoWrapperProps = {
    photo: Photo
    storyID: string
}

export function PhotoWrapper(props: PhotoWrapperProps) {
    const focalLength = props.photo.focalLength?.replace(/ /g, '') || "unknown";
    const aperture = Number.parseFloat(props.photo.aperture || "NaN");
    const imageURL = makeURL(`stories/${props.storyID}/${props.photo.fileName}`);

    return <div className="photo-wrapper">
        <img src={imageURL} alt={props.photo.fileName}></img>
        <div className='photo-details'>
            <p>{focalLength} f/{aperture} {props.photo.shutterSpeed}s ISO{props.photo.iso}</p>
        </div>
    </div>
}