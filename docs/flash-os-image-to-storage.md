---
dashboardUrl: https://dashboard.ionoid.io
---

# Flash OS Image to Storage

To flash an OS image to the storage of your device you have two options:

 - Beginner users: [Use the Etcher tool](#beginner-users-using-the-etcher-tool-windows-linux-macos)
 - Experienced users: [Use the `dd` tool](#experienced-users-use-the-dd-tool-on-linux)


## Beginner users: Using the [Etcher Tool](https://etcher.io/) (Windows / Linux / MacOS)

First, make sure to install the [Etcher tool](https://etcher.io/). Then, choose
the section that corresponds to your device in the following list:

 - [Flash Raspberry Pi](#flash-raspberry-pi)
 - More soon

### Flash Raspberry Pi

Raspberry Pi boots from a microSD card (see
[Raspberry Pi SD Cards](https://www.raspberrypi.org/documentation/installation/sd-cards.md)
), so you will need to flash the OS image onto a microSD card to make it work.
For that, follow the following instructions:

- Connect a microSD card inside the card reader that is connected to your PC
(where Etcher is installed)

![Connect microSD to Slot](/steps/flash-os-image/microsd-card-reader.jpg)

- Make sure you have [generated an OS image for your
  device](/docs/register-devices.md)

- Open the Etcher tool

![Etcher Tool](/steps/flash-os-image/etcher.png)

- Click on *Select image*, then browse to the generated OS Image

- Click on *Select drive* and select the microSD card that you want to install
  the OS image in

- Click on *Flash* and wait until the flash process ends

- Once the flash process ended, eject your microSD card

- Insert the microSD card into the microSD card slot on the underside of your
Raspberry Pi device

![Insert microSD card](/steps/flash-os-image/raspberry-pi-microsd-slot.png)

- On the <a :href="$frontmatter.dashboardUrl" target="_blank">Ionoid.io dashboard</a>,
go to the *project details page* that you used to generate the OS image

- Power your Raspberry Pi device and see it appear on the *project details
  page* of the Ionoid.io dashboard (process can take from few seconds to few
  minutes, depending on the internet connection)

![Boot the Device](/steps/projects-and-devices/boot_device.gif)

- Congratulations! your device is now registered on Ionoid.io and ready to be
  managed from the dashboard.

::: tip
It may happen that the device tooks a long time to show up in the dashboard,
this is due to the *auto resizing storage* process. If you see that it took too
much time to show up, just unplug then replug the power supply to reboot the
device.
:::

## Experienced users: Use the `dd` tool on Linux

We are going to use the `dd` tool to copy the OS image into the microSD card.

::: danger
Please be careful when choosing the device that you will write to using the `dd`
tool.
:::

### Discover the device storage

- Connect a microSD card inside the card reader that is connected to your PC
  (where Linux is installed)

::: warning
Usually the microSD card will be auto-mounted as soon as you connect it to your
PC. If that is the case, make sure to *unmount* it before proceeding furthur,
otherwise the flash process will fail!
:::

- Find out how Linux is seeing the card, for that, you can use for example the
  `dmesg` tool. Run the following command (as superuser) immediately after
  inserted the microSD card:

```bash
sudo dmesg | tail -30
```

- Find out how Linux is seeing the inserted card by looking at something like
  `sdx`. For example, in the following `dmesg` output, the name that has been
  affected to the microSD card by Linux is `sdc`:

```{11,12,13,14,15,16}
[138644.433472] usb 3-2: new high-speed USB device number 2 using xhci_hcd
[138644.588120] usb 3-2: New USB device found, idVendor=XXXX, idProduct=XXXX
[138644.588128] usb 3-2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[138644.588132] usb 3-2: Product: Ultra
[138644.588136] usb 3-2: Manufacturer: SanDisk
[138644.588139] usb 3-2: SerialNumber: XXXXXXXXXXXXXXXXXXXX
[138644.589696] usb-storage 3-2:1.0: USB Mass Storage device detected
[138644.591798] scsi host7: usb-storage 3-2:1.0
[138645.603456] scsi 7:0:0:0: Direct-Access     XXXXXX  XXXX            1.00 PQ: 0 ANSI: 6
[138645.604595] sd 7:0:0:0: Attached scsi generic sg3 type 0
[138645.604812] sd 7:0:0:0: [sdc] 60062500 512-byte logical blocks: (30.8 GB/28.6 GiB)
[138645.606477] sd 7:0:0:0: [sdc] Write Protect is off
[138645.606482] sd 7:0:0:0: [sdc] Mode Sense: 43 00 00 00
[138645.607062] sd 7:0:0:0: [sdc] Write cache: disabled, read cache: enabled, doesn't support DPO or FUA
[138645.616198]  sdc: sdc1 sdc2
[138645.618650] sd 7:0:0:0: [sdc] Attached SCSI removable disk

```

- The path of the microSD card on the filesystem is then `/dev/sdc`

::: tip
If you didn't yet unmount the mounted microSD card, you can use these
informations to unmount it using the tool `umount`. In the previous example,
there are two mounted partitions you need to unmount:

```bash
sudo umount /dev/sdc1
sudo umount /dev/sdc2
```
:::

- Run the following command to write the OS image into the microSD card (we
  suppose that the OS image has filename `OS-image.img` and that the microSD
  card is at `/dev/sdc`):

```bash
sudo dd bs=4M \
  if=OS-image.img \
  of=/dev/sdc status=progress conv=fsync
```

::: tip INFORMATION
Here is what the previous command options mean:
```
if=input        file which is OS image (unzipped image, .img format)
of=output       file which is the connected device storage
bs=4M           read and write up to BYTES bytes at a time
```
:::

- Make sure that write cache is flushed with:

```bash
sync
```

::: tip
If your OS image is inside a zip file, use the following command that will
first unzip the image (you must have the `unzip` tool installed):

```bash
unzip -p \
  sealos-image-minimal-raspberrypi3-20200201073416.rootfs.rpi-sdimg.img-ionoid.zip | sudo dd \
  of=/dev/sdX bs=4M status=progress conv=fsync
```
:::

- Once the flash process ended, eject your microSD card

- Insert the microSD card into the microSD card slot on the underside of your
Raspberry Pi device

- On the <a :href="$frontmatter.dashboardUrl" target="_blank">Ionoid.io dashboard</a>,
go to the *project details page* that you used to generate the OS image

- Power your Raspberry Pi device and see it appear on the *project details
  page* of the Ionoid.io dashboard (process can take from few seconds to few
  minutes, depending on the internet connection)

![Boot the Device](/steps/projects-and-devices/boot_device.gif)

- Congratulations! your device is now registered on Ionoid.io and ready to be
  managed from the dashboard.

::: tip
It may happen that the device tooks a long time to show up in the dashboard,
this is due to the *auto resizing storage* process. If you see that it took too
much time to show up, just unplug then replug the power supply to reboot the
device.
:::

::: tip
It may happen that you need to copy back the image from the microSD card into
the computer for debugging purposes, fot that just run the inverse of the
previous `dd` command (replace the `$COUNT` value of count option with the
number of blocks that was displayed by `dd` when you first copied the OS image
onto the microSD card):

```bash
dd bs=4M if=/dev/sdc of=dirty-image.img count=$COUNT
```
:::

::: tip Have Questions?
We're always happy to help with IoT projects or other questions you might have!
Check our [documentation](https://docs.ionoid.io/), contact our
support desk at <support@ionoid.io>, or our sales team at <sales@opendevices.io>.
You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtODAzODgwOTIyMDY4LWExNWVmMDJhMDE2YWYyMjE3N2FlOGNlZjM4NDlmYmM5MmNhYWY1ZTZmOWMwYTYxYTMxNTQzODYzYmRmODMzOWI)
:::
