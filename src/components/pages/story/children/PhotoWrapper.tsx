import React from "react";
import "./PhotoWrapper.css";
import { Photo } from "../../../model/Photo";
import { makeURL } from "../../../util/URLUtils";
import {SmoothLoadingImage} from "../../../shared/SmoothLoadingImage";

type PhotoWrapperProps = {
    photo: Photo
    storyID: string
}

export function PhotoWrapper(props: PhotoWrapperProps) {
    const focalLength = props.photo.focalLength?.replace(/ /g, '') || "unknown";
    const aperture = Number.parseFloat(props.photo.aperture || "NaN");
    const imageURL = makeURL(`stories/${props.storyID}/${props.photo.fileName}`);
    let maintainPhotoAspectRatioStyle = {};

    const imageAspectRatio = props.photo.height! / props.photo.width!;
    if (imageAspectRatio > 0) {
        maintainPhotoAspectRatioStyle = {
            paddingBottom: `${imageAspectRatio * 100}%`,
            height: "0"
        }
    }

    return <div className="photo-wrapper" style={maintainPhotoAspectRatioStyle}>
        <SmoothLoadingImage src={imageURL} alt={props.photo.fileName}/>
        <div className='photo-details'>
            <p>{focalLength} f/{aperture} {props.photo.shutterSpeed}s ISO{props.photo.iso}</p>
        </div>
    </div>
}

