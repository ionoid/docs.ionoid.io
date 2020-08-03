# Linux IoT and Edge Apps

Ionoid.io IoT Apps are self contained apps. The application software, metadata,
libraries and other dependencies are bundled within the app package.

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
[zip](https://en.wikipedia.org/wiki/Zip_(file_format)) apps. The archive
files are standard files format that were released several years ago, they
are well supported and the tools to process them are all Open Source tools.
If you are deploying Archive apps then please keep reading this
document. Archive apps must include an [App YAML file](#app-yaml-format)
that describes how the application will run.


- Modern [docker](https://docker.com) containers (*in progress - still
under development*).
If you are deploying [docker container](https://docker.com) apps then
please go directly to this link [docker apps](#docker-apps).


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

# Name of APP must be Alphanumeric and can contain the following
# special characters "_", "." and "-".
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

  # App hello-world entry
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
[IoT App Golang Hello World](https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar)

The content of the `app.yaml` file would be:
```
name: hello-world
version: 1.0
apps:
  hello-world:
    command: /bin/hello-world
```

### Build Archive Apps

Since archive apps are archive files that contain the app and its dependencies,
there are several methods to build such archive files. The following section
details this for simple applications that do not need a full
Linux file systems and other tools.

For more complex applications with dependencies and often docker images, there are
multiple tools:

* [Make IoT Apps](#make-iot-apps) is our standard method to build lightweight self
contained IoT and Edge apps.


* [Debian debootstrap](https://wiki.debian.org/Debootstrap) to bootstrap a basic Debian
image. Then the application, its bundles and the `app.yaml` file should all be
added to the Debian image that will be used to generate the artifact tarball.


* Minimal simple way to build archive apps:
These steps describe how we manually built our previous example [Hello World IoT App](https://storage.googleapis.com/public.opendevices.io/apps/arch/armv7/hello-world/hello-world-armv7-v0.2.tar)

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

    - Or generate a zip archive: **Under development, will be supported soon.**


## Docker Apps

[Ionoid.io](https://ionoid.io/) supports [docker](https://docker.com) containers and apps.

**This is still under development and will be released soon.**


## Make IoT Apps

Ionoid.io IoT and Edge Linux apps are archive files that bundle the application,
libraries, files and other dependencies. Using some of
[Linux Containers Technology](https://en.wikipedia.org/wiki/List_of_Linux_containers) to implement
file system isolation, devices are able to run multiple applications isolated from one another.

Please refer to the next chapter [Build IoT and Edge Apps](https://docs.ionoid.io/docs/build-iot-archive-apps.html)
to build IoT archive apps.

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
