# Linux IoT and Edge Apps

[Ionoid.io](https://ionoid.io/) IoT and Edge Linux apps are archive files that bundle the application,
libraries, files and other dependencies. Using some of
[Linux Containers Technology](https://en.wikipedia.org/wiki/List_of_Linux_containers) to implement
file system isolation, devices are able to run multiple applications isolated from one another.

Installed apps are located on device storage at:
```
/data/apps/store/
```

For every application, there will be a corresponding directory:
```
/data/apps/store/appname
```

All files corresponding to an app are located under its path. This makes
it easy to stop, **disable**, or completely remove applications.


## Overview

### IoT Apps

[Ionoid.io](https://ionoid.io/) supports multiple IoT app formats:

- Static binaries without libraries or other filesystem dependencies.
If you are deploying [Static
Binaries](https://en.wikipedia.org/wiki/Static_build) then please keep
reading this document. Static binaries will have an auto generated
[App YAML file](#app-yaml-format).


- Archive
[tarball](https://en.wikipedia.org/wiki/Tar_(computing)) or
compressed `tar.gz` apps. The archive
files are standard files format that were released several years ago, they
are well supported and the tools to process them are all Open Source tools.
If you are deploying Archive apps then please keep reading this
document. Archive apps must include an [App YAML file](#app-yaml-format)
that describes how the application will run.


- Modern [docker](https://docker.com) containers (*in progress - will be released soon*).
If you are deploying [docker container](https://docker.com) apps then
please go directly to this link [docker apps](#docker-apps).

<Content :page-key="getPageKey($site.pages, '/docs/_build-archive-apps-with-docker.html')" />


### App YAML Format

Each app is described using The App YAML format. The App yaml is
a simple manifest to describe how the app should work, it is fully
described in the `app.yaml` file, next section, and only works with
apps that are static binaries or archive apps.


Docker apps do not need the `app.yaml` file, they already
contain their own app manifest and are auto handled withing their
appropriate agents.
Visit this link for [docker apps](#docker-apps) for more information.


The `app.yaml` file should be present in the root directory of an
archive file. Every app must have its corresponding `app.yaml` file.
For [static binaries](#static-binaries) with no dependencies, an
`app.yaml` file will be auto-generated on the fly to define how the
app should run.


App YAML file example:

```yaml
# Note: lines starting with `#` are comments and have no semantics.

# Name of APP must be unique on the device.
# Only alphanumeric + the special "_", "." and "-" characters are allowed.
# Minimum 2 characters, up to 64 characters.
# Mendatory field.
name: appname

# Version of App to be deployed
# Mendatory field.
version: 1.0

# Description of App
description: My App

# List of Applications inside the same IoT App archive, for now we only
# support one single app. Support of multiple apps inside will be added in
# the future.
apps:

  # App hello-world entry, must be Alphanumeric and may contain the
  # special characters "_", "." and "-".
  # Minimum 2 characters, up to 64 characters.
  # Mendatory field.
  hello-world:

    # Environment Vars for Hello World Optional
    environment:
      A: "ABC"

    # Semilar to environment but reads the environment variables
    # from a text file. The text file should contain new-line-separated
    # variable assignments.
    environmentfiles:
      - "/etc/hello-world-environment1"
      - "/etc/hello-world-environment2"

    # Optional command to be executed before the main executable app.
    # Can be used to setup environment.
    start-command: /bin/echo hello

    # Main executable app, mendatory field.
    command: /bin/hello-world

    # Optional command to be executed after the main app finishes
    # Can be used to clean up state.
    stop-command: /bin/echo stopped

    # Daemon Command type takes one of these values:
    # * simple:     the process configured with command
    #               is the main process of the service.
    #               This is the default value if daemon is
    #               not set.
    # * forking:    it is expected that the process configured
    #               with command will call fork() as part
    #               of its start-up.
    # * oneshot:    it is expected that the process configured
    #               with command will exit or terminate.
    #
    # For more details check systemd service documentation.
    daemon: simple | forking | oneshot

    # Starting from newer versions, to have the app run with
    # root privileges you have set it to true. By default the
    # app will run as a normal `ionoid-app` user.
    privileged: true


volumes:
  # Volumes and mounts to be made accessible inside the application.
  #
  # Volumes support two types of mount 'rbind' and 'norbind':
  #   * rbind: perform a recursive bind mount of the volume.
  #   * norbind: perform a non-recusive bind mount.
  #
  # Volumes support different options:
  #   * rw: perform a regular writable bind mount (unless source is read-only).
  #   * ro: perform a read-only bind mount.
  #
  - src=filesystem_path:dst=app_path:type=rbind:options=rw
  - src=filesystem_path:dst=app_path:type=norbind:options=ro

  # /dev, /proc and /sys are already mounted inside the app
  # no need to mount them again.

  # Mounting device host /etc configuration inside the app:
  - src=/etc:dst=/etc,type=rbind,options=ro

  # If you want to make the root-filesystem available then the
  # following volume mount is the safest instruction.
  - src=/:dst=/:type=norbind,options=ro

# Health check is a special command to do health checking on
# your one or multiple apps
# still under development
health-check:
  command:        /bin/health-check
```


The `health-check` field is a special directive that may allow you to do
health checks on your running apps. Right now it is **in progress - still under
development**.

So for a first example the [Hello World IoT app example:](https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar)

The content of the `app.yaml` file would be:
```yaml
name: hello-world
version: 1.0
apps:
  hello-world:
    command: /bin/hello-world
```

### App Persist Data

If you want to persist your data on the device and share it with other
applications and the rest of the system, then this can be easily done by
writing to the `/shared/$myappname` directory volume. Every application has by
default the `/shared/$myappname` volume mounted and available inside its
filesystem.

From the application point of view:
```bash
/shared/$myappname
```

From the rest of the system point of view and where you will find your data:
```bash
/data/apps/shared/$myappname
```

The `/shared/$myappname` directory is **world readable and accessible**
to the system. If you write secret files there, then make sure to set the
appropriate access permissions, especially if your device is used by non-trusted
third parties.


The `/shared/$myappaname` directory is owned by:
```
User: ionoid-app - means all applications running with that User ID can write to it.
Group: ionoid-app  - means all applications running with that Group ID can write to this directory and share data.
```

Volumes and mounts are the preferred mechanism to persist data on the
device by applications and share it with others.


## Static Binaries

Static binaries are apps without libraries or other filesystem
dependencies. Please visit [wikipedia Static
Binaries](https://en.wikipedia.org/wiki/Static_build) link to read more
about it.

Building static binaries differs from one language and environment to another, the following documentation will try to help you get started
with it.

The target OS here is of course `Linux`.

### Golang Static Binaries

Before we start with our steps on how to produce static binaries from
Golang sources, let's see some variables and environments that we have to
set, this will allows us to really produce statically linked binaries:

- `CGO_ENABLED=0` Instruct compiler to disable CGO and statically link C
bindings.

- `GOOS=linux` Our target Operating System is Linux.

- `GOARCH=$arch` Our target board architecure. If in doubts please visit
our [Supported boards
Table](https://docs.ionoid.io/#/../NewProject/newProject?id=supported-boards-and-operating-systems-table).
Current supported values for `$arch` are `amd64`, `arm` or `arm64`.

- `GOARM=$version` If the target board architecture is `arm` then you have
to set the `GOARM` or the `machine variable`. Current supported values
are `6` or `7`. For a detailed explanation please visit the official
[Golang ARM Wiki](https://github.com/golang/go/wiki/GoArm).

Now to build Golang static binaries; let's use one of these build methods:

- ARMv6

```bash
env CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=6 \
  go build -tags 'osusergo netgo' -ldflags '-extldflags "-static"' main.go
```


- ARMv7

```bash
env CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=7 \
  go build -tags 'osusergo netgo' -ldflags '-extldflags "-static"' main.go
```


- amd64

```bash
env CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
  go build -tags 'osusergo netgo' -ldflags '-extldflags "-static"' main.go
```

### More Static Binaries

We are going to add more static binaries support for other languages, it is under
development.


### Deploy Static Binaries

When deploying static binaries with [Ionoid.io](https://ionoid.io/), there is
no need to put it inside docker or write an `app.yaml` file for it. If your
application has no external dependencies on files or other
applications, just upload it to the internet and point Ionoid.io
to its deployment URL.

An `app.yaml` file will be auto-generated on the fly at the devices
level using the following format:
```yaml
name: $myappname
version: $unixtimestamp
apps:
  $myappname:
    command: /bin/$myappname
```

Example of a generated `app.yaml` of a `hello-world ARMv6` version.

The complete source file and binaries of that hello-world App are
located here:
https://github.com/ionoid-io-projects/apps/tree/master/hello-world

Auto-generated `app.yaml` of the hello-world example:
```yaml
name: hello-world
version: 1583693787
apps:
  hello-world:
    command:  /bin/hello-world
```

```
hello-world: is the the last resource file from the URL path.
             In this example the URL is
             'https://github.apps.ionoid.net/hello-world/arm6/build/bin/hello-world'
             and the last part makes the App which is 'hello-world'.

version: is the Unix timestamp in UTC (Coordinated Universal Time).
```


To deploy your static binaries, upload them to the internet, and point the
deployment URL to the right one.

For more examples please visit our hosted sample apps here: [Ionoid.io
Sample Apps](https://github.apps.ionoid.net/)

![Deploy Static Binary](/steps/projects-and-devices/app-deployment.png)


**Notes: More robust deployment methods are being developped, they will be added soon.**


## Archive Apps

Archive apps are compressed files in
[tar](https://en.wikipedia.org/wiki/Tar_(computing)) or
[zip](https://en.wikipedia.org/wiki/Zip_(file_format)) formats.


Archive apps are composed of the following files:
```
* app.yaml      : App Basic information encoded in a Yaml file
* meta/         : Meta directory that contains extra app metadata (Optional).
* bin/          : Binary directory where the app may reside.
* ...           : Rest of the app file system and other dependencies files.
```

Example of a hello world app:
[IoT App Golang Hello World](https://github.com/ionoid/docs-examples/blob/master/archives/hello-world-armv7-v0.2.tar?raw=true)

The content of the `app.yaml` file would be:
```
name: hello-world
version: 1.0
apps:
  hello-world:
    command: /bin/hello-world
```

Since archive apps are archive files that contain the app and its dependencies,
there are several Open Source based methods to build such archive files.
The following sections details this with real examples.


### Minimal Archive Apps

The following is a minimal simple way to build archive apps, these steps describe how we manually built our previous
example [Hello World IoT
App](https://github.com/ionoid/docs-examples/blob/master/archives/hello-world-armv7-v0.2.tar?raw=true) for `ARMv7`:

    - Create the app directory `hello-world`.
      ```bash
         mkdir hello-world
         cd hello-world
      ```

    - Populate the app directory with `app.yaml` and executable files.
      ```
         hello-world:/
             ./app.yaml
             ./bin/
                 hello-world
      ```

    - Generate the app tar archive, in the following example, we assume we build for ARMv7.
      ```bash
         tar cvvf hello-world-armv7-v0.2.tar -C hello-world --transform='s,^./,,' .
      ```

    - The `hello-world-armv7-v0.2.tar` is our final app that can be deployed to IoT Devices.

    - The app archive can also be compressed to save data usage later with the following:
      ```bash
         tar czvf hello-world-armv7-v0.2.tar.gz -C hello-world --transform='s,^./,,' .
      ```


### Docker Archive Apps

[Docker](https://docker.com) offers the necessary tooling to build containers, then export them as archive apps. This laverages
IoT and Edge apps to be as simple as possible using the [App YAML file](#app-yaml-format), while at the same time offers the
unique way to run apps without including complex containers feautres that are more suited for the cloud.

The following steps demonstrates on how to pull a [Node.js docker](https://hub.docker.com/_/node) container for `ARMv7` and export
it into an archive app, that is then deployed directly using [Ionoid.io
deployment](https://docs.ionoid.io/docs/deploy-iot-apps.html).


<Content :page-key="getPageKey($site.pages, '/docs/_extract-docker-image-requirements.html')" />


Steps to extract docker containers (run with sudo if necessary):


1. Pull [Node.js for ARMv7](https://hub.docker.com/_/node?tab=tags&page=1&name=alpine) container based on `Alpine Linux`:
```bash
docker pull --platform linux/arm/v7 node:current-alpine
docker images
REPOSITORY                                                      TAG                                        IMAGE ID            CREATED             SIZE
node                                                            current-alpine                             013139600021        19 hours ago        107MB
```

2. Extract docker image layers:
```bash
docker save node | undocker --no-whiteouts -d -i -o node-armv7 node:current-alpine
```

Make sure to use the right `tag`. Example: `current-alpine`. The above command extracts the image into directory
`node-armv7`.


3. Add the following `app.yaml` file to `node-armv7` directory:
```yaml
name: node-armv7
version: v14.10.0
apps:
  node-armv7:
    command: /usr/local/bin/node --version
```

```bash
cp app.yaml node-armv7/
```

4. Tar compress application and produce the app archive from parent directory of `node-armv7`:
```bash
sudo tar --numeric-owner --create --auto-compress \
        --xattrs --xattrs-include=* --file node-v14.10.0-armv7.tar.gz \
        --directory node-armv7 --transform='s,^./,,' .
```

5. Upload and deploy your application according to [deploy IoT apps documentation](https://docs.ionoid.io/docs/deploy-iot-apps.html)

The built node.js archive of the previous example can be found here
[node-v14.10.0-armv7.tar.gz](https://raw.githubusercontent.com/ionoid/docs-examples/master/archives/node-v14.10.0-armv7.tar.gz)


6. To update your archive using [Delta Update
workflow](https://docs.ionoid.io/docs/deploy-iot-apps.html#_2-delta-updates-workflow)

Produce the `app.xdelta` file then upload it according to the URL schema:
```
xdelta3 -e -s node-v14.10.0-armv7.tar.gz node-v14.11.0-armv7.tar.gz app.xdelta
```

Follow the [Delta Update workflow](https://raw.githubusercontent.com/ionoid/docs-examples/master/archives/node-v14.10.0-armv7.tar.gz) to update your application from a specified version to any other version directly.


### Mkiot Archive Apps

[Make IoT Apps](#make-iot-apps) is our standard method to build lightweight self
contained IoT and Edge apps. For more details, please refer to the next chapter [Build IoT and Edge Apps](https://docs.ionoid.io/docs/build-iot-archive-apps.html)
to build IoT archive apps using [mkiot](https://github.com/ionoid/mkiot).


### Debian deboostrap Apps

[Debian debootstrap](https://wiki.debian.org/Debootstrap) is an Open Source tool to bootstrap a basic Debian
image. The application, its bundles and the `app.yaml` file should all be
added to the Debian image that will be used to generate the artifact tarball.



## Docker containers

[Ionoid.io](https://ionoid.io/) supports [docker](https://docker.com) containers and apps that are handled directly by
docker.

**This will be released soon.**


<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
