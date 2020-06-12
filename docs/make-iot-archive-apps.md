# Build Linux IoT and Edge archive Apps

Ionoid.io IoT and Edge Linux apps are archive files that bundle the application,
libraries, files and other dependencies. Using some of
[Linux Containers Technology](https://en.wikipedia.org/wiki/List_of_Linux_containers) to implement
file system isolation, devices are able to run multiple applications isolated from one another.

This section describes how to build archive Linux apps that can run on any Linux device. To be able to deploy the
archive with Ionoid.io and run it on devices, the archive must then include the [App Yaml file](https://docs.ionoid.io/docs/iot-apps.html#app-yaml-format)
inside the root directory `/` of the archive.


## Linux containers concept

[Linux containers](https://en.wikipedia.org/wiki/List_of_Linux_containe) are a modern technology that packages the
application and all its dependencies so the applications can run on any Linux system.
Ionoid.io supports Linux containers by using classic archive files format that were first released in late
of 1979. Using archive files allows to generate standalone packages that include everything the application
needs to run, from software to libraries and configurations. More importantly archive files are well
supported and most of the tools to process them are standard Open Source tools.

At run-time when the archive file is [deployed on devices](https://docs-dev.ionoid.io/docs/deploy-iot-apps.html) on
devices, the
[App Yaml file](https://docs.ionoid.io/docs/iot-apps.html#app-yaml-format) that is on the root directory `/` of the
archive will be used to define how the application will run.

Ionoid.io makes minimal use of Linux containers technologies by just using file system isolation, where each deployed
application will have its own correspondig directory, see previous chapter [IoT Apps
docuementation](https://docs.ionoid.io/docs/iot-apps.html).


## mkiot (make IoT)

To generate the app archive we use [mkiot](https://github.com/ionoid/mkiot), which uses
[debootstrap](https://wiki.debian.org/Debootstrap) and other tools to build an app archive.


`mkiot` allows to peform:

1. Install a Linux distribution file system that will be used as a build image for the application.

2. Build the application.

3. Copy application files and other dependencies into image.

4. Copy the [app.yaml file](https://docs.ionoid.io/docs/iot-apps.html#app-yaml-format) into the image.

5. Generate an artifact from the image.


Please follow [mkiot installation](https://github.com/ionoid/mkiot#install) documentation and install it on your Linux working station.


## Linux IoT build environments

This section describes how to generate the IoT and Edge apps build environments.

Building an IoT app can somehow be challening, usually we suggest to start with
a full build enviroment, then try to optimize later using [mkiot multi-stage
builds](https://github.com/ionoid/mkiot#multi-stage-builds) to reduce the final image size.

Ionoid.io supports [Debian](https://www.debian.org) and [Alpine Linux](https://alpinelinux.org/) images, more will be
added soon.


### Debian environment

Assuming [mkiot](https://github.com/ionoid/mkiot/) is installed and ready, let's install a basic debian environment.

From the [mkiot examples](https://github.com/ionoid/mkiot#examples) we use the [Debian minimal
buildspec.yaml](https://github.com/ionoid/mkiot/blob/master/examples/debian/buildspec.yaml):

```bash
sudo mkiot build examples/debian/buildspec.yaml
```

This will generate an artifact in `tar archive format` at:
```bash
./output/artifacts/debian-buster_armhf_2020-06-11.tar
```

If you want to generate a debian environment with development tools and packages, you can use the
[Debian devtools
buildspec.yaml](https://github.com/ionoid/mkiot/blob/master/examples/devtools/debian/buster/buildspec-devtools-armhf.yaml)
example and edit it to add more commands or packages to be installed in `commands`

```bash
sudo mkiot build examples/devtools/debian/buster/buildspec-devtools-armhf.yaml
```

This will generate an artifact in `tar archive format` at:
```bash
./output/artifacts/devtools_debian-buster_armhf.tar
```


### Alpine environment

Under development, will be added soon.



## Node.js environment

[Node.js](https://nodejs.org) is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web
browser. [Wikipedia](https://en.wikipedia.org/wiki/Node.js)

We can build a `Node.js` environment using one of the supported distributions as a base image for the file system.


### Debian based Node.js

The following examples demonstrate how to use `mkiot` to build a `Node.js` environment that is targeted to `ARMv7`
architectures, as `Node.js` only support `ARMv7` and above, for further documentation please see [Node.js Download
page](https://nodejs.org/en/download/).

To have a Node.js environment from [Upstream Node.js
package](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
on a minimal Debian file system, run `mkiot` with the following
[Node.js minimal Debian
buildspec.yaml](https://github.com/ionoid/mkiot/blob/master/examples/node.js/debian/buster/buildspec-node.js-minimal-debian-armhf.yaml):

```bash
sudo mkiot build examples/node.js/debian/buster/buildspec-node.js-minimal-debian-armhf.yaml
```

To have `Node.js` installed as a binary on a `Debian` file system, with extra packages like: `devtools` , `build
essential` and `yarn`, run `mkiot` build with the following [Node.js devtools debian
buildspec.yaml](https://github.com/ionoid/mkiot/blob/master/examples/node.js/14/buster/buildspec-node.js-devtools-debian-armv7l.yaml):

```bash
sudo mkiot build examples/node.js/14/buster/buildspec-node.js-devtools-debian-armv7l.yaml
```

Produced artifacts will be inside `./output/artifacts/` in current working directory.

To change the enviroment in order to update which packages or denpendecies should be installed or removed, please copy
and edit the `buildspec.yaml` files. Make sure to copy in `script` file that is used during build to the right location
too, according to [mkiot script command](https://github.com/ionoid/mkiot#build-spec-commands-documentation).


### Alpine based Node.js

Will be added soon.


## Python environment

[Python](https://www.python.org/) is an interpreted, high-level, general-purpose programming language.
[Wikipedia](https://en.wikipedia.org/wiki/Python_(programming_language).


### Debian based Python

The following examples demonstrate how to use `mkiot` to build a `Python` environment that is targeted to `ARM`
architectures.

To have a `python2` environment on minimal `Debian`, run `mkiot` build with the [Python2 on minimal Debian
buildspec.yaml](https://github.com/ionoid/mkiot/blob/master/examples/python/debian/buster/buildspec-python2-minimal-debian-armhf.yaml) file:

```bash
sudo mkiot build examples/python/debian/buster/buildspec-python2-minimal-debian-armhf.yaml
```

To have a `python3` environment on minimal `Debian`, run `mkiot` build with the [Python3 on minimal Debian
buildspec.yaml](https://github.com/ionoid/mkiot/blob/master/examples/python/debian/buster/buildspec-python3-minimal-debian-armhf.yaml)
file:

```bash
sudo mkiot build examples/python/debian/buster/buildspec-python3-minimal-debian-armhf.yaml
```

To have a `python3` environment on `Debian` with some development packages, run `mkiot` build with the [Python3 on
devtools Debian
buildspec.yaml](https://github.com/ionoid/mkiot/blob/master/examples/python/debian/buster/buildspec-python3-devtools-debian-armhf.yaml)
file:

```bash
sudo mkiot build examples/python/debian/buster/buildspec-python3-devtools-debian-armhf.yaml
```




<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
