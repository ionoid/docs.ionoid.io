# Debug IoT Devices

Sometimes it may be necessary to debug a device if contains errors. You can of
course use the [Ionoid.io dashboard to view some informations
](#use-the-dashboard-device-information) about the device,
including errors outputs. In the case where the Ionoid.io dashboard information
is not enough to locate the failure, you may have to [connect to the device via
ssh](#connect-to-the-device-via-ssh).

## Use the Dashboard Device Information

Go to your device details page and lookup for the following information:

- Status and last time seen
- Device operating system versions
- Device SealOS Manager version
- Device Systemd version
- Device Docker version
- Error logs (if any)

## Connect to the Device via SSH

You first need to get an address to which you will open a SSH session. For
that, you have two options:

1. Either [get the local IP address](#get-the-local-ip-address) of your device, you need
  to be connected on the same
  [local area network (LAN)](https://en.wikipedia.org/wiki/LAN) to be able to
  connect to the device via this IP address
2. Or [get the public URL](#get-the-public-url) of your device, to which you can
  open a SSH session from anywhere

::: tip
If you are on Windows, you need first to download a SSH client like [Putty
](https://www.putty.org/)
:::

### 1. Get the Local IP Address

#### Using the dashboard

Go to the *device details page* and scroll to the bottom, then click on the
**NETWORKS** tab. You will see the local IP address of the device in the
**Network Interfaces, IP Addresses** section:

![Get Local IP](/steps/debug-iot-devices/get-local-ip.png)

::: tip
You can make sure that you are connected to the same local area network of the
device by looking at the **Conncted Networks** section:

![Get Connected Network](/steps/debug-iot-devices/get-connected-network.png)
:::

#### Using a network scan

**TODO**

### 2. Get the Public URL

Go to the *devices details page* and scroll to the bottom, then click on the
*DETAILS* tab. On the *Device Public URL* section, check the checkbox to turn
the public URL of the device on. Then, copy the displayed public URL.

::: warning
This option is not yet available for all users.
:::

### Connect to the Device

Once you got the local IP address, or the public URL of the device, use the
following command to connect to it via SSH. In this command we suppose that the
you want to use the local IP address that is `192.168.1.122`, and that the user
with which you want to connect is `pi` (which is the default user on Raspberry
Pi devices, this can also be `root` or any other user you created on the device):

```bash
ssh pi@192.168.1.22
```

Provide the user password (which is by default `raspberry` for the `pi` user on
Raspberry Pi devices), and you should be logged in via SSH if the device is
still online.

## Connect to the Device Via Serial Communication

If for one reason or another, you can't connect to the device via a network,
you can use a USB cable to associate the micro USB port on device to
the upstream USB port on your computer.

### Raspbian Serial Communication

If you are using Raspbian as an operating system, please follow these instructions:

- On your computer, install [minicom](https://linux.die.net/man/1/minicom) or any
other serial communication program
- Add your current user to the dialout group to be able to open the serial
  port:

```bash
$ sudo usermod -a -G dialout $USER
```

- On the microSD card where you have flushed Raspbian:

  - Append the following line at the end of the the `/boot/cmdline.txt` file
    (which will enable the serial option):

  ```
  console=serial0,115200 console=tty1
  ```

  - Append the following line at the end of the `/boot/config.txt` file (which
  will enable UART console during boot):
  ```
  enable_uart=1
  ```

  - Append the following line at the end of the `/root/etc/inittab` file (which
    will enable getty on serial):
  ```
  T0:23:respawn:/sbin/getty -L ttyS0 115200 vt100
  ```

- Finally boot the Raspberry Pi and use *minicom* from your computer to connect:

```bash
$ minicom -b 115200 -o -D /dev/ttyUSB0
```

- On your computer, some types of USB serial adapter may appear as `/dev/ttyACM0`,
if so use:

```bash
$ minicom -b 115200 -o -D /dev/ttyACM0
```

> References:
> [Raspberry Pi Serial Connection](https://elinux.org/RPi_Serial_Connection)

## Troubleshooting IoT Device

Assuming you successfully logged in into your device, information about status,
services and apps can be found using the `systemctl` utility.

::: tip Tip for Linux Starters
When walking around in a Linux terminal, you may find yourself in file reading
mode (like after running `journalctl` command), just type `q` to quit.
:::

### Troubleshooting System Status

- To get the overall status of the device, run the command:

```bash
sudo systemctl status
```

::: tip
If you are logged in as root, no need to prefix commands
with `sudo`.
:::


### Troubleshooting Services and Apps

- To get the list of failed services on the device, run the command:

```bash
sudo systemctl --failed
```

- To get the status of services or apps, use the `status` operation. For example,
to get the status of `systemd-journald` service:

```bash
sudo systemctl status systemd-journald
```

- To get the status of Ionoid.io SealOS managers, check the following services:

  - Status of main manager, run:
  ```bash
  sudo systemctl status sealos-manager
  ```

  - Status of manager that executes and performs actions, run:

  ```bash
  sudo systemctl status sealos-manager-actions
  ```

- To see if Ionoid.io SealOS manager boot setup succeededs, run the following
  command:

```bash
sudo systemctl status sealos-boot-setup
```

You should see as output:
```
Main PID: 52 (code=exited, status=0/SUCCESS)
```
If it's not the case, then something went wrong during initial Ionoid.io SealOS
manager boot setup.


### Troubleshooting IoT Apps

If you have deployed an app using the native format `tar`, `zip` or
anything that is not a *Docker Container/App*, then you can debug you app using
the following commands (we suppose that the app name is "hello-world"):

- Get status of an app:

```bash
sudo systemctl status hello-world
```

- Get log entries of an app:

```bash
sudo journalctl -b -u hello-world
```


### Troubleshooting Docker IoT Apps

If you have deployed Docker containers or apps then you can use the `Docker` tools:

::: tip
If docker commands do not work, run them with sudo.
:::


- List all running docker apps and containers:

```bash
docker ps
```


### Inspecting Device Logs

Information logs about device services and apps can be found using the `journalctl`
which is part of
[systemd-journald](https://www.freedesktop.org/software/systemd/man/systemd-journald.service.html),
it only handles current boot logs as they are stored in a volatile way below
`/run/log/journal/`, and they are cleaned at reboot.

The default system logger is [rsyslog](https://www.rsyslog.com/), to inspect the
persistent logs, try to locate files under `/var/log/` directory.


#### Kernel logs

To get the kernel logs use `dmesg`, the following asks for the last
`100 log entries`:

```bash
sudo dmesg | tail -n 100
```


#### System logs with `rsyslog`

For further documentation on [rsyslog](https://www.rsyslog.com/) see [rsyslog
guides](https://www.rsyslog.com/category/guides-for-rsyslog/)

To list all system logs that were handled by rsyslog, and inspect current and previous boot logs:

```bash
ls -lha /var/log/syslog*
```

#### System logs with `systemd-journald`

- To get the system logs of the current boot:

```bash
sudo journalctl -b
```

- To get the last 10 entries of system logs of the current boot:

```bash
sudo journalctl -b -n 10
```

- To follow in realtime system logs of the current boot:

```bash
sudo journalctl -b -f
```

- To check the logs of a Ionoid.io manager `sealos-manager` agent:

```bash
# examples
sudo journalctl -b -u sealos-manager
sudo journalctl -b -u sealos-manager-actions
```

- To check the logs of your service or app, for example the *hello-world* app:

```bash
sudo journalctl -b -u hello-world
```

::: tip Have Questions?
We're always happy to help with IoT projects or other questions you might have!
Check our [documentation](https://docs.ionoid.io/), contact our
support desk at <support@ionoid.io>, or our sales team at <sales@opendevices.io>.
You can also chat live with other developers in  [#slack](https://ionoidcommunity.slack.com/join/shared_invite/enQtODAzODgwOTIyMDY4LWExNWVmMDJhMDE2YWYyMjE3N2FlOGNlZjM4NDlmYmM5MmNhYWY1ZTZmOWMwYTYxYTMxNTQzODYzYmRmODMzOWI)
:::
