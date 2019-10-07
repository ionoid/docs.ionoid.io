# Add a new device to your IoT Project

Once you create a project, you can start adding devices by following this tutorial.


## Add new device

Click on **Add device** button to add a new device to the project.
 
![Add Device](AddDevice.png)
 
Click on **Advanced System Configuration** to customize system device configuration.
 
![New Device](NewDevice.png)


## General settings

You can set or modify  the configuration of your device system  easily using dashboard.
 - Set or modify device hostname. Here it is possible to append an asterisk as a suffix to the name (e.g. device-\*) if you want a random id at the end. Example hostname: `device-*` will be `device-2153`. This is useful in case you want to use the same configuration on a fleet of devices.
 - Set or modify DNS servers.
 - Set or modify NTP servers.

![General Settings](GeneralSettings.png)


## Network settings

You can configure easily your WiFi settings by:

 - Go to  **Network Settings** section.
 - Enable WiFi by clicking on **On** button.
 - Enter your WiFi SSID and password.
 - Select a security option.
 - For development: it is strongly recommended that you set a second Wifi as a fallback,
 in case there are some errors. Maybe use your `phone wireless` as a second
 Wifi.

![Network Settings](wifi-config.gif)


## Generate Linux-IoT OS

Once you have finished configuration settings, follow up by preparing your Linux-IoT system.

Currently Ionoid IoT supports only [Raspbian OS](https://www.raspberrypi.org/downloads/raspbian/). More OSs will be added soon.


### Beginners - Generate your Linux-IoT OS (Method 1)

After finishing the configuration step of your device you will need to apply the newly generated configure to your device,

To do so we will use ionoid build os generator that will make sure everything is well installed, in the end of operation it will

ask you to download the generated os to be burned and setup in your raspberry pi.

#### Step 1: 
Click on "download os" to run build os, if you are a little thursty after all those effort it's time to take coffee, build os will take some time to finish it work so dont worry a drink your coffee.

![How to download os](./DownloadOsAnim.gif)

After a little time the building tools will informe you that your newly generated OS including the configuration you just made is ready to download.

![Generating os finished successfully](./DownloadOsEndAnim.png)

#### Step 2:
Click on the big blue friendly link smartly named "Download Image" to start downloading you new
OS

![Start Download](./DownloadOsDownloadButton.png)

Congratulation, your os is now ready to be burned inside your flash drive.

### Advanced Linux Users - Generate Linux-IoT OS (Method 2)

After finishing configuration settings, click on `Download OS Configuration` button, the dashboard will generate a **config.json** file that contains your device settings.

![OS configuration file](OSconfig.png)

The **config.json** file must be saved in your home directory or in a secure place, do **not share it**. It contains sensitive information about your device's security.


After that, go ahead and download your Rasbpian image, you can find the latest version [here Raspbian image](https://www.raspberrypi.org/downloads/raspbian/)


Assuming that all goes well which should be the case, create a working
direcotry.

```bash
mkdir -p ionoid-build
```

Copy `raspbian` zipped image and `config.json` files into `ionoid-build`
directory.

`2018-06-27-raspbian-stretch-lite.zip`

`config.json`


To generate your Linux-IoT system run the following commands, and when
prompted for `root` password, enter it, it will allow to mount the image
patch it and unmount it.

If your target board is an ARMv7 like the Raspberry PI 3, then set
`MACHINE` environment variable to `arm7` like this:
`MACHINE=arm7`. For a Raspberry PI Zero use `MACHINE=arm6`.

For a complete list of supported devices and machine variables please
refer to [Supported
Boards](https://docs.ionoid.io/#/../NewProject/newProject?id=supported-boards)



```bash
cd ionoid-build
curl https://manager.services.ionoid.net/install-tools.bash | MACHINE=arm7 IMAGE=2018-11-13-raspbian-stretch-lite.zip CONFIG=config.json bash

```

Once finished you should find the new patched image inside the `output`
directory:
`./output/2018-06-27-raspbian-stretch-lite.zip`


Now burn the generated `zip image` into your MicroSD card. You can use
[Etcher](https://etcher.io/) to copy the `zip image`.


After that, boot your device and go to your project in [Ionoid Dashboard](https://dashboard.ionoid.io), it should take some minutes before the device auto shows up there.


![Device Booting](DeviceBoot.png)

Congratulations!



---


### Questions?
We're always happy to help with IoT Projects or other questions you might have! Check our [documentation](https://docs.ionoid.io/#/), contact support: support@ionoid.io, or connect with our sales team: sales@opendevices.io. You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtNTAzMTEwMTc5NDc2LTM2ODgxY2VmYTljNjM2NTNmZmVjYTEzY2Q4NTgyZTljYzI3MzhiZGRlODkzNTE3NTE3ODk5ZmFjNjYzOGRjZTM).
