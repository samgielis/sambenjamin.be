export { }

const path = require('path');
const FileSystem = require('fs');
const ExifReader = require('exifreader');

type Photo = {
    fileName: string
}

type EXIFData = {
    focalLength?: string
    aperture?: string
    shutterSpeed?: string
    iso?: string
    width?: number
    height?: number
}

type AugmentedPhoto = Photo & EXIFData;

type Story = {
    photos: AugmentedPhoto[];
}

function readExifData(imageURL: string): EXIFData {
    let rawImageData = FileSystem.readFileSync(imageURL);
    const tags = ExifReader.load(rawImageData);

    return {
        focalLength: tags["FocalLength"]?.description,
        aperture: tags["ApertureValue"]?.description,
        shutterSpeed: tags["ShutterSpeedValue"]?.description,
        iso: tags["ISOSpeedRatings"]?.description,
        width: tags["Image Width"]?.value,
        height: tags["Image Height"]?.value
    };
}

function readStory(path: string): Story {
    const rawdata = FileSystem.readFileSync(path);
    return JSON.parse(rawdata);
}

function writeJSON(path: string, object: Object) {
    const objectAsString = JSON.stringify(object, null, '\t');
    FileSystem.writeFileSync(path, objectAsString);
}

function isStoryFolder(folderURI: string): boolean {
    const folderInfo = FileSystem.lstatSync(folderURI);
    return folderInfo.isDirectory();
}

function preProcessStories() {
    const storiesFolderPath = './public/stories/';

    const filesInStoriesDirectory = FileSystem.readdirSync(storiesFolderPath);

    for (let fileIndex = 0; fileIndex < filesInStoriesDirectory.length; fileIndex++) {
        const folderURI = path.join(storiesFolderPath, filesInStoriesDirectory[fileIndex]);

        if (!isStoryFolder(folderURI)) {
            continue;
        }

        const storyIndexURL = path.join(folderURI, "index.json");
        const story = readStory(storyIndexURL);
        const augmentedStory = augmentStoryWithExifData(story, folderURI);
        
        writeJSON(storyIndexURL, augmentedStory);
    }
}

function augmentStoryWithExifData(story: Story, storyFolderURI: string): Story {
    for (let photoIndex = 0; photoIndex < story.photos.length; photoIndex++) {
        const photo = story.photos[photoIndex];
        const exifData = readExifData(path.join(storyFolderURI, photo.fileName));
        story.photos[photoIndex] = { ...photo, ...exifData };
    }
    return story;
}

preProcessStories();