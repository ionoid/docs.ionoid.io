# Ionoid.io Docs Working Repo

## Install VuePress

Better install VuePress globally

```sh
yarn global add vuepress
# or
npm install -g vuepress
```

## Directory Structure

The current (May 23, 2020) directory structure is:

```
.
├── docs
│   ├── debug-iot-devices.md
│   ├── deploy-iot-apps.md
│   ├── faq.md
│   ├── getting-started.md
│   ├── impressum.md
│   ├── index.md
│   ├── iot-apps-basic-examples.md
│   ├── legal.md
│   ├── projects.md
│   ├── register-a-device.md
│   └── supported-boards-and-os.md
├── index.md
├── package.json
├── README.md
└── .vuepress
    ├── config.js
    ├── public
    │   ├── brand.png
    │   ├── favicon.ico
    │   ├── logo.png
    │   └── steps
    │       ├── [list of animated GIFs]
    │       └── ...
    └── styles
        └── index.styl
```

The important files here are:

### `./index.md` File: The Main Docs Website Page

I've already created a simple minimalistic home page, you can change it if you
want.

### `./docs/` Folder: One File for each Section

Files that you add here must be listed in the `./.vuepress/config.js` file, for
example:

```js
// ...
sidebar: [
  {
    title: 'Docs',
    collapsable: false,
    children: [
      {
        title: 'Introduction',
        path: '/docs/'
      },
      {
        title: 'Getting Started',
        path: '/docs/getting-started.md'
      },
      {
        title: 'Projects',
        path: '/docs/projects.md'
      },
      // ...
    ]
  }
]
// ...
```

You can change the title of each section if you wish. If you change a file name
in the `./docs/` folder, do not forget to update it also in
`./.vuepress/config.js`

### `./.vuepress/config.js` File: The Website Configuration File

Usually you will not have to edit this file very often, except if:

- You want to add a section: for this add an object in the
  `module.exports.themeConfig.sidebar[0].children` array.
- You want to add a link into the navbar, for this add an object in the
  `module.exports.themeConfig.nav` array.
- You want to change the title that appears in the left sidebar, for this edit
  the `module.exports.themeConfig.sidebar[0].title`

### `./.vuepress/public/` Folder: The Public Assets

Here you put any asset you need to be public, the main assets we need in our
docs website are the animated GIFs of different steps described in the docs.
I've choosed to put all GIFs inside the folder `./.vuepress/public/steps/` with
comprehensive name because some GIFs are used multiple times in multiple
places/pages. If we duplicate GIFs more bandwidth will be consumed, and user
experience impacted. This is my choice, if you want to categorize with folders,
up to you.

# How to Generate the Perfect GIF image

I've tested dozens of tools, used many services, and finally I ended with this
solution:

- Use the [ScreenCastify](https://www.screencastify.com/) extension on Chrome.
- Free solution limits time to 5 minutes, we don't care, we need recordings of
  few seconds
- Don't forget to close the tooltip that is at left-bottom of the screen when
  you begin recording (to record press Alt+Shift+R), you will have 5 seconds to
  close the tooltip and prepare yourself
- Use fullscreen windows when recording, ratio is better
- To end recording, press again Alt+Shift+R, a new tab with your video will
  opens, in this tab you can crop the video length from the start/end easily
- Click on download > export as MP4 to download the video (yes, this tool can
  also generate directly our animated GIF using download > export animated GIF,
  but don't use it, their GIF images are too heavy!)
- Once MP4 downloaded, we need to convert it to an animated GIF, the best tool
  I found is [GifCurry](https://github.com/lettier/gifcurry) (written in my
  favorite language, Haskell :-D)
- When running GifCurry, perhaps it will complain about missing packages,
  install them and restart it
- Open a video with GifCurry, here too you can crop the image from start/end if
  you wish, then export it as GIF using the "File" button
- Very important, all image in docs website must be of 700px width to keep
  things clean and beautiful, so before exporting a GIF make sure to click on
  "Size" button, then set width to 700, also, to keep GIF size small, set FPS
  to 15, and (IMPORTANT!) colors count to 100 (this last configuration will
  have a big impact on the GIF size, we can end up with GIFs of 2Mo with 256
  colors, and 0.7Mo with 100 colors)

# Test locally

Simply run the following command to start the dev live server:

```bash
yarn dev
# or
npm run dev
```

Then open [localhost:8080](http://localhost:8080). When you change any file,
changes will be reflected automatically on the webpage, except for changes in
the `config.js` file, you need to restart the dev live server.

Sometimes it bugs, you get a blank page, just restart the dev live server.

# Deploy

Once you've done all changes, simply run the deploy script:

```sh
./deploy.sh
```

And don't forget to push your local changes with a `git push`
