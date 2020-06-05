# Supported Boards and OS

Currently we support the following boards and operating systems. This list is
subject to continuous updating.

## Supported Boards

### [Raspberry Pi](https://www.raspberrypi.org/)

| Boards                                                                                  | Architecture          | Machine Var            | Supported OS                 |
| --------------------------------------------------------------------------------------- |---------------------- | ---------------------- | ---------------------------- |
| [Raspberry Pi Zero](https://www.raspberrypi.org/products/raspberry-pi-zero/)            | ARMv6                 | arm6                   | Raspbian                     |
| [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/)        | ARMv6                 | arm6                   | Raspbian                     |
| [Raspberry Pi 2 B](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/)        | ARMv7                 | arm7                   | Raspbian                     |
| [Raspberry Pi 3 B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)        | ARMv7 (32-bit)        | arm7                   | Raspbian                     |
| [Raspberry Pi 3 A+](https://www.raspberrypi.org/products/raspberry-pi-3-model-a-plus/)  | ARMv8-AArch64 (64-bit)| arm64                  | Raspbian, SealOS             |
| [Raspberry Pi 3 B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/)  | ARMv8-AArch64 (64-bit)| arm64                  | Raspbian, SealOS             |
| [Raspberry Pi 4](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/)          | ARMv8-AArch64 (64-bit)| arm64                  | Raspbian                     |

### [BeagleBone](https://beagleboard.org/)

| Boards                                                       | Architecture          | Machine Var            | Supported OS                 |
| ------------------------------------------------------------ | --------------------- | ---------------------- | ---------------------------- |
| [BeagleBone Black](https://beagleboard.org/black)            | ARMv7                 | arm7                   | Debian                       |
| [BeagleBone Green](https://beagleboard.org/green)            | ARMv7                 | arm7                   | Debian                       |
| [BeagleBone Green W](https://beagleboard.org/green-wireless) | ARMv7                 | arm7                   | Debian                       |

### [Incostartec](https://incostartec.com/)

| Boards                                                       | Architecture          | Machine Var            | Supported OS                 |
| ------------------------------------------------------------ | --------------------- | ---------------------- | ---------------------------- |
| [pLILLY-A20](https://incostartec.com/product/plilly-a20/)    | ARMv7                 | arm7                   | SealOS                       |

## Supported Operating Systems

### [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)

Ionoid.io Raspbian are adapted Raspbian images from the [Raspberry PI Foundation’s official operating
system](https://www.raspberrypi.org/downloads/raspbian/). The only difference is
that we removed the [openresolv](https://roy.marples.name/projects/openresolv/)
package because it does not work properly with [NetworkManager](https://wiki.debian.org/NetworkManager).

::: tip IMPORTANT NOTES
- Ionoid.io network connectivity works only if NetworkManager is installed
- Default user and password for Raspbian images are `pi` and `raspberry`. Make sure to change it after you successfully login into your Raspbian OS
:::

#### Raspbian Ionoid.io Images

- **Raspbian Buster Lite (without desktop)** Minimal image based on Debian Buster
without desktop (Size 434 MB)
- **Raspbian Buster with desktop** Image with desktop based on Debian Buster (Size
  1136 MB)
- **Raspbian Buster with desktop and recommended software** Image with desktop and
recommended software based on Debian Buster (Size 2530 MB)

### [SealOS - Secure Linux-IoT](https://ionoid.io/)

SealOS is a secure Linux-IoT operating system that is distributed to some
Ionoid.io partners for now. A more general purpose version will be available
for free soon.

To get a SealOS image please contact us at <contact@ionoid.io>.

::: tip Have Questions?
We're always happy to help with IoT projects or other questions you might have!
Check our [documentation](https://docs.ionoid.io/), contact our
support desk at <support@ionoid.io>, or our sales team at <sales@opendevices.io>.
You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtODAzODgwOTIyMDY4LWExNWVmMDJhMDE2YWYyMjE3N2FlOGNlZjM4NDlmYmM5MmNhYWY1ZTZmOWMwYTYxYTMxNTQzODYzYmRmODMzOWI)
:::
