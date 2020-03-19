import React from "react";
import ExifReader from 'exifreader';
import "./PhotoWrapper.css";

type PhotoWrapperProps = {
    imageUrl: string,
    alt: string
}

export function PhotoWrapper(props: PhotoWrapperProps) {
    const img = <img src={props.imageUrl} alt={props.alt}></img>;
    return img;
}

type PhotoWrapperState = {
    imageData: ArrayBuffer | undefined
    focalLength: string | undefined
    aperture: string | undefined
    shutterSpeed: string | undefined
    iso: string | undefined
}

export class PhotoWrapperClass extends React.Component<PhotoWrapperProps, PhotoWrapperState> {

    loadImage() {
        fetch(this.props.imageUrl)
            .then((response) => { return response.arrayBuffer() })
            .then((arrayBuffer) => {
                try {
                    const tags = ExifReader.load(arrayBuffer);
                this.setState({
                    imageData: arrayBuffer,
                    focalLength: tags["FocalLength"]?.description,
                    aperture: tags["ApertureValue"]?.description,
                    shutterSpeed: tags["ShutterSpeedValue"]?.description,
                    iso: tags["ISOSpeedRatings"]?.description
                });
                } catch (error) {
                    console.error("Error parsing "+ this.props.imageUrl);
                } 
            });
    }

    componentWillMount() {
        this.setState({});
        this.loadImage();
    }

    render() {
        if (!this.state.imageData) {
            return <div style={{ width: "100%", height: "500px", backgroundColor: "whitesmoke" }}></div>
        }

        const focalLength = this.state.focalLength?.replace(/ /g, '') || "unknown";
        const aperture = Number.parseFloat(this.state.aperture || "NaN");
        
        return <div className="photo-wrapper">
            <img src={this.props.imageUrl} alt={this.props.alt}></img>
            <div className='photo-details'>
                <p>{focalLength} f/{aperture} {this.state.shutterSpeed}s ISO{this.state.iso}</p>
            </div>
        </div>
    }
}