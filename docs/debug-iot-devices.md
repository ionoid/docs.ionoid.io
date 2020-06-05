# Debug IoT Devices

To Debug your Device first login into your [Ionoid IoT Account](https://dashboard.ionoid.io/login)
and locate your Device.


## 1. Device Information

Go to your Device details page and lookup for the following information:

- Status and Last Time Seen
- Device Operating System Versions
- Device SealOS Manager Version
- Device Systemd Version
- Device Docker Version

## Locate a Device

### Using the Dashboard

If you want to troubleshoot your device with `ssh`, then continue
reading this section, otherwise skip to `Connect to Device Via Other ways` section.

If you are on Windows, please install first [Putty
Client](https://www.putty.org/)

Locate Device `Network Interfaces` and `IP Addresses` section
inside the Device Page on Dashboard and note the `IP ADDRESS` that you
will use to `ssh` into Device. Make sure you are on the same network as
the device. You may also try to see the Wi-Fi networks that this device
is connected to, in the `Connected Network Section`.

**The follow is a beta feature not available to all accounts:**
Try to see if you can `ssh` into the Device from the [Ionoid IoT
Dashboard](https://dashboard.ionoid.io/) or use the `Public Device URL` if
available and `ssh` into that `IP Address`.

If you were able to find the device local `IP Address` go to the next
section. Otherwise continue reading next section locate `Via Network Scan`.

### Using a Network Scan

**TODO**

### Connect to Device

#### Via SSH Network

Connect to your device via `ssh`.

First locate last known available users to the system. In your device
page

- Replace `$USER` with a valid user from your Device, usually either `root` or another user that you did create.
- Replace `$IP_ADDRESS_OF_DEVICE` with the IP Address of your device

```bash
ssh $USER@$IP_ADDRESS_OF_DEVICE
```

Provide the `$USER` password and you should be in if everything was
right and if the device is still up and able to handle `ssh`.

#### Via Serial Communication

##### Raspbian Serial Communication

If you are using Raspbian as an operating system, please follow these instructions.

- On your host or working station, install minicom or any other serial communication program
- Add your current user to the dialout group to be able to open the serial port

```bash
$ sudo usermod -a -G dialout $USER
```

- On the Micro SD card where you have flushed Raspbian, update the Linux `/boot/cmdline.txt` file on the `boot` partition, add the following:
```
console=serial0,115200 console=tty1
```

- On same `boot` partition of the Micro SD card partition, enable UART console during boot, add the following to the end of `/boot/config.txt` file:
```
enable_uart=1
```

- On the `root` partition of your Micro SD card, enable getty on serial line by adding the following to the `/root/etc/inittab` file:
```
T0:23:respawn:/sbin/getty -L ttyS0 115200 vt100
```

The above has been verified on `Raspbian` distribution.

- Finally boot the Raspberry Pi and use minicom from your working station to connect to it:

```bash
$ minicom -b 115200 -o -D /dev/ttyUSB0
```

- On your host or working station, some types of USB serial adapter may appear as `/dev/ttyACM0`, if so use:

```bash
$ minicom -b 115200 -o -D /dev/ttyACM0
```

References:
[Raspberry Pi Serial Connection](https://elinux.org/RPi_Serial_Connection)

### Troubleshooting IoT Device

Assuming you successfully `logged-in` into your device, information about status, services and Apps can be found using the `systemctl` utility.


#### Troubleshooting System status

- To get the overall status of the Device:

```bash
sudo systemctl status
```

**Important: if you are logged in as root, no need to prefix commands
with sudo**


#### Troubleshooting Services and Apps

- To get the list of failed Services on the Device:

```bash
sudo systemctl --failed
```

- To get the status of Services or Apps, use the `status` operation:
Example get status of `systemd-journald` service:

```bash
sudo systemctl status systemd-journald
```


- To get the status of Ionoid.io SealOS managers, check the following services:
Status of Main manager:

```bash
sudo systemctl status sealos-manager
```

Status of manager that executes and performs actions:

```bash
sudo systemctl status sealos-manager-actions
```

- To see if Ionoid.io sealos manager boot setup succeeded:

```bash
sudo systemctl status sealos-boot-setup
```

You should be able to read in the output:
```
Main PID: 52 (code=exited, status=0/SUCCESS)
```

If no then something went wrong during initial Ionoid.io sealos manager
boot setup.


#### Troubleshooting IoT Apps:

If you have deployed Apps using the native format `tar`, `zip` or
anything that is not a `Docker Container/App`, then just replace `$MYAPP` with the name
of your App:

- Get Status of an App:

```bash
sudo systemctl status $MYAPP
```

- Get log entries of an App:

```bash
sudo journalctl -b -u $MYAPP
```


#### Troubleshooting Docker IoT Apps:

If you have deployed Docker Containers or Apps then you can use the `Docker` tools.


**If docker commands do not work, run them with sudo**


- List All running docker Apps and containers:

```bash
docker ps
```

or if you need permissions:

```bash
sudo docker ps
```


#### Inspecting Device Logs

Information about Device services and Apps logs can be found using the `journalctl`
which is part of
[systemd-journald](https://www.freedesktop.org/software/systemd/man/systemd-journald.service.html), it only handles current boot logs as they are stored in a volatile way below `/run/log/journal/` ; and they are cleaned at reboot.

The default system logger is [rsyslog](https://www.rsyslog.com/), to inspect the persistent logs, try to locate files under `/var/log/` directory.


##### Kernel logs

- To get the kernel logs use `dmesg`, the following asks for the last
`100 log entries`:

```bash
sudo dmesg | tail -n 100
```


##### System logs with rsyslog

For further documentation on [rsyslog](https://www.rsyslog.com/) see: [rsyslog
guides](https://www.rsyslog.com/category/guides-for-rsyslog/)

- To list all system logs that were handled by rsyslog, and inspect current and previous boot logs:

```bash
ls -lha /var/log/syslog*
```


##### System logs with systemd-journald

- To get the system logs of the current boot:

```bash
sudo journalctl -b
```

- To get the last 10 entries of system logs of the current boot:

```bash
sudo journalctl -b -n 10
```

- To Follow in realtime system logs of the current boot:

```bash
sudo journalctl -b -f
```

- To check the logs of a Ionoid.io manager `sealos-manager` agent:

```bash
sudo journalctl -b -u sealos-manager
```

```bash
sudo journalctl -b -u sealos-manager-actions
```


- To check the logs of your Service or App, replace `$MYAPP` with the name
of your App:

```bash
sudo journalctl -b -u $MYAPP
```


**New Linux users:
When you are in a linux terminal and you may find your self in file reading
mode, just type `q` to quit the reading mode. It should work ;-) !**

::: tip Have Questions?
We're always happy to help with IoT projects or other questions you might have!
Check our [documentation](https://docs.ionoid.io/), contact our
support desk at <support@ionoid.io>, or our sales team at <sales@opendevices.io>.
You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtODAzODgwOTIyMDY4LWExNWVmMDJhMDE2YWYyMjE3N2FlOGNlZjM4NDlmYmM5MmNhYWY1ZTZmOWMwYTYxYTMxNTQzODYzYmRmODMzOWI)
:::
