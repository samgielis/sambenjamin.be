import React from "react";

type PhotoWrapperProps = {
    imageUrl: string,
    alt: string
}

export function PhotoWrapper(props: PhotoWrapperProps) {
    return <img src={props.imageUrl} alt={props.alt}></img>;
} 