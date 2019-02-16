# NoteTracker 
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)


NoteTracker is a simple note-taking app merged with time tracking app.. ehm what?

Yes. Maybe you are a developer, a designer or someone who needs to track their time spent on a certain task, but you also love to take notes, TO-DOs or just writing ideas down, so you will not forget them later. NoteTracker has got you covered!

With Rich Text Editor you are free to create beautiful notes as you like and also you don't have to worry about the time tracking! Everything is set up automatically for you! Just create a project, task and focus on your work!

![image](https://user-images.githubusercontent.com/24323087/52904720-55c05d80-3230-11e9-9586-1cbc472c4b26.png)

*NoteTracker is still a WIP project. If you are using it for your work I'm really happy you like it, but bear in mind your data could be damaged anytime with new updates. That's why auto-updating is not set up yet and if you want to update your app, you have to download the new installer and update it manually.*

## Table of contents

- [Download](#download)
- [Technologies](#technologies)
- [Usage (Setting your own instance of application)](#usage)
- [Author](#author)
- [License](#license)

## Download
*Download links will be added soon.*

## Technologies

The application is built with [Electron](https://electronjs.org/) and [React](https://reactjs.org/) with a little help from [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).
The back-end is provided by [Firebase](https://firebase.google.com/).

Also, multiple 3rd party packages were used. Check out `package.json`, if you are interested.

But shout out to [jpuri/react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg) for creating this amazing wrapper around [DraftJS](https://draftjs.org/), which really made my life easier with setting up the text editor.

## Usage
### Install dependencies
```bash
yarn
```
### Setting up back-end for app

If you want to set up your own instance you will have to provide your own `firebase` credentials and create `firebase-env.js` file, which can be found in `config` folder. (check `firebase-env-sample.js` in the same folder)

```bash
export const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

```

## Run application in development
```bash
yarn dev
```

### Packaging app
```bash
yarn package
```

## Author
NoteTracker was developed by [Samuel Farkas](https://github.com/samuelfarkas) (me) as a weekend project, but I really liked the idea. I was tired of using multiple software to track my time and taking notes during my work, that's why I created NoteTracker.

Also, I'd like to thank [Matúš Juraj Kobyľan](https://www.behance.net/user/?username=matusjurajkobylan) for helping me with the app branding.  

## License
[MIT](https://choosealicense.com/licenses/mit/)
