---
dashboardUrl: https://dashboard.ionoid.io
---

# Register Devices

Ionoid.io dashboard offers the possibility to manage an entire fleet of devices.
By just clicking on buttons from one single page, you will be able to control and
remotely deploy applications to hundreds or thousands of devices.

Ionoid.io uses [Linux-IoT](https://www.linux.org/) operating systems
and supports multiple flavors that run [systemd](https://systemd.io/), the system and
service manager for Linux operating system. You can check the [supported
boards and operating systems](/docs/supported-boards-and-os.md).

First you have to register your device(s) on Ionoid.io. It is as simple as clicking on
a button, downloading an OS image, flashing the device storage then booting the device.

There is also the possibility to configure your image by chaning
the WiFi network(s) password(s), the device name, or informations about
cellular network(s). Please follow with the next section that explains it
in more details.


## Prepare Registering

On Ionoid.io, devices belong to projects. If you didn't yet create a project,
please follow [these guidlines](/docs/manage-projects.md). Once you've created a
project, open the **ADD A DEVICE** tab, you will notice 5 sections:


### Project General Informations

Here you can set a name (a hostname) for the device. If you let it blank, the
default hostname that is set in the original image will be choosed. You can
also prefix a `-*` to the name to get a random ID at the end of the device
hostname, in case you have multiple devices serving the same purpose and you
need a different name for each devices (e.g. temp-sensor-1254,
temp-sensor-5699, temp-sensor-8445, ... etc).

You can also choose the image that will be flashed into the device. Click on
the device model to see images that are available for this model.

![Project General Informations Section](/steps/projects-and-devices/add_device_choose_board.png)

### Project Parameters

Used only to display the project name, API key for devices and the API endpoint
used by the device.

### General Settings

You can change the default
[Google DNS](https://developers.google.com/speed/public-dns) and
[NTP](https://developers.google.com/time) servers that will be used by devices.

<Content :page-key="getPageKey($site.pages, '/docs/_deployment-settings.html')" />

<Content :page-key="getPageKey($site.pages, '/docs/_advanced-settings.html')" />

### Project Environment Variables

Here you can set the environment variables that can be used by apps on the target
device. So that you have not to hardcode their values into these apps.
Think of an endpoint URL that your app will use, say, to
grab some data from the internet. If this URL changes in the future, or if you
want to use a different service that offers the same data, the only thing you
will need to do is to change the environment variable without touching the app.

![Add a Cellular Network](/steps/projects-and-devices/add_env_var.gif)

Once all configuration done, you can now follow with OS image generation.

## Generate OS Image

To generate the OS image, you have three options:

- Begginer users (preferred): Use the [online Ionoid.io Build OS tool](#using-the-ionoid-io-build-os-tool) to build, generate
  and download a ready-to-use image
- Advanced users: Use the [Ionoid.io build scripts](#using-the-ionoid-io-build-scripts) on a downloaded image
- Advanced users: [Install on an already running Linux system](#installing-on-an-already-running-linux-system) - to be added soon


### Download OS Image

All you have to do is to click on the **Download OS** to download a
ready-to-flash image:

![Generate OS Image](/steps/projects-and-devices/download_os.png)

Wait a few seconds until the image has been fully generated, then click on the
image link to start download:

![OS Image Ready](/steps/projects-and-devices/image_ready_download_os.png)

::: tip
You can save the current project configuration as the default one by clicking
on **Save as default project settings**.
:::

You can also download the `config.json` file that has been used to generate the
image (not mandatory):

![Download OS Config](/steps/projects-and-devices/image_ready_download_config.png)

Once the OS image downloaded, you can [flash the device](#flash-the-os-image)
using this image.

### Using Ionoid.io Build Scripts

::: tip PREREQUISITE
In order to use the build scripts, you will have to install the following tools
first:
- [jq](https://stedolan.github.io/jq/) which is a lightweight and flexible
command-line JSON processor.
- [multipath-tools](https://packages.debian.org/stretch/multipath-tools) to
create device maps from partition tables.
:::

If you want to build your own OS, you will first need to generate the
`config.json` file corresponding to the current project configuration. For
that, simply click on **Download config file**.

::: danger
Please keep in mind that the `config.json` file contains your project credentials
and secrets, do not share this file with untrusted parties.
:::

Now, you must have on hand an OS image to use, you have two options:

- Use a Raspbian image that you can download [from
here](https://www.raspberrypi.org/downloads/raspbian/).
- Use SealOS (Secure Linux-IoT OS): SealOS is a secure Linux-IoT operating system
that is distributed to some Ionoid.io partners for now. A more general purpose
version will be available for free soon. To get your SealOS image please contact
us at <contact@ionoid.io>.


::: tip NOTE
Ionoid.io Raspbian images are adapted from the
[official Raspbian images](https://www.raspberrypi.org/downloads/raspbian/).
The only difference is that Ionoid.io Raspbian images use
[NetworkManager](https://wiki.debian.org/NetworkManager) to handle network
connectivity. Also, the [openresolv](https://roy.marples.name/projects/openresolv/)
package has been removed because of incompatibility with NetworkManager.
:::

::: warning
- Ionoid.io network connectivity works only if NetworkManager is installed.
- Default user and password for Raspbian images are `pi` and `raspberry`. Make
sure to change them after you successfully login into your Raspbian OS.
:::

Once you've got your OS image, open your favorite console and follow the
following steps:

- Create a working directory and access it:

```bash
mkdir -p ionoid-build && cd ionoid-build
```

- Copy (or move) your image to that directory:

```bash
cp /path/to/os/image.zip .
```

- Copy (or move) the downloaded `config.json` file to the same directory:

```bash
cp /path/to/file/config.json .
```

- Run the build script to build your final configured Linux-IoT image. Make sure
to enter the root password when asked (superuser privileges are required to
mount the image in order to configure it). In the followig command, we suppose
that you didn't rename the `config.json` file, and that the image name is `image.zip`:

```bash
curl https://github.install-ionoid.sdk.ionoid.net/install-tools.bash | IMAGE=image.zip CONFIG=config.json bash
```

Once the build process finishes, you will find the new patched image in the
`output` directory. You can now [flash the
device](#flash-os-image-to-storage) using this image.

### Installing on an Already Running Linux System

To be added soon

## Flash OS Image to Storage

Please follow [these guidlines](/docs/flash-os-image-to-storage.md) to flash the generated OS image to the storage of your device.

## Boot the device

Once the device flashed with the new OS image, boot your device and observe
<the-project-details-page/> on the dashboard, you will notice that the device appeared
in the list of devices:

![Boot the Device](/steps/projects-and-devices/boot_device.gif)

Now you can control you device from the dashboard using the control menu that
is above the device list.

<Content :page-key="getPageKey($site.pages, '/docs/_have-questions.html')" />
