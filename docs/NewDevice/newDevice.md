# Add a new device to your IoT Project

Once you create a project, you can start adding devices by following the
this tutorial.


## Add new device

Click on **Add device** button to add a new device to the project.
 
![Add Device](AddDevice.png)
 
Click on **Advanced System Configuration** to customize system device configuration.
 
![New Device](NewDevice.png)


## General settings

You can set or modify  the configuration of your device system  easily using dashboard.
 - Set or modify device hostname. Here it is possible to append an asterisk as a suffix to the name (e.g. device-\*) if you want a random id at the end. Example hostname: `device-\*` will be **device-2153**.
 - Set or modify DNS servers.
 - Set or modify NTP servers.

![General Settings](GeneralSettings.png)


## Network settings

You can configure easily your WiFi settings by:

 - Go to  **Network Settings** section.
 - Enable WiFi by clicking on **On** button.
 - Enter your WiFi SSID and password.
 - Select a security option.

![Network Settings](NetworkSettings.png)


## Generate Linux-IoT OS

Once you have finished setting your system, follow up my preparing your Linux-IoT system.

Currently this tutorial only supports [Raspbian OS](https://www.raspberrypi.org/downloads/raspbian/). More OSs will be added soon.


### Beginners - Generate your Linux-IoT OS

To be added soon.


### Advanced Linux Users - Generate Linux-IoT OS

After finishing settings configuration, click on `Download OS Configuration`, the dashboard will generate a file named **config.json** that contain the whole configuration of your device.

![OS configuration file](OSconfig.png)

The **config.json** file sould be saved in your home directory or in a secure place, do **not share it**. It contains sensitive information about your device's security.


After that, go ahead and download your Rasbpian image, you can find the latest version [here Raspbian image](https://www.raspberrypi.org/downloads/raspbian/)


Assuming that all goes well which should be the case, in the current
directory we will have the following files:

`2018-06-27-raspbian-stretch-lite.zip`

`config.json`


To generate your Linux-IoT system run the following command, and when
prompted for `root` password, enter it, it will allow to mount the image
patch it and unmount it.

If your target board is an ARMv7 like the Raspberry PI 3, then set
**MACHINE** environment variable to **arm7** like this:
**MACHINE=arm7**. For a Raspberry PI Zero use **MACHINE=arm6**.


```bash
curl https://manager.services.ionoid.net/install-tools.bash | MACHINE=arm7 IMAGE=2018-06-27-raspbian-stretch-lite.zip CONFIG=config.json bash

```

Once finished your should find the new patched image into the **output**
directory.




---


### Questions?
We're always happy to help with IoT Projects or other questions you might have! Check our [documentation](https://docs.ionoid.io/#/), contact support: support@ionoid.io, or connect with our sales team: sales@opendevices.io. You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtNTAzMTEwMTc5NDc2LTM2ODgxY2VmYTljNjM2NTNmZmVjYTEzY2Q4NTgyZTljYzI3MzhiZGRlODkzNTE3NTE3ODk5ZmFjNjYzOGRjZTM).
