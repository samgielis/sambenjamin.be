import "./SmoothLoadingImage.css";
import React, { CSSProperties } from "react";

interface SmoothLoadingImageProps {
    src: string
    alt: string
    style?: CSSProperties
}

interface SmoothLoadingImageState {
    hasLoaded: boolean
}

export class SmoothLoadingImage extends React.Component<SmoothLoadingImageProps, SmoothLoadingImageState> {
    constructor(props: SmoothLoadingImageProps) {
        super(props);
        this.state = {
            hasLoaded: false
        }
    }

    render() {
        const className = this.state.hasLoaded ? 'loaded' : 'loading';
        const loadCallback = () => {
            this.setState({
                hasLoaded: true
            })
        };
        return <img style={this.props.style} className={"smooth-load " + className} src={this.props.src} alt={this.props.alt} onLoad={loadCallback}></img>
    }
}