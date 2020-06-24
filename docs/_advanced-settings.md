### Advanced Settings

#### WiFi Configuration

You can add up to 5 WiFi networks by clicking on **Add a WiFi network**, for each
network you can set:

- The network ID (SSID) (required)
- The network visibility (default to 'not hidden')
- The network security mode (default to 'No security')
- The network password (required unless the security mode is set to 'No
  security')
- The network priority: networks with higher priority will be preferred. Default
is 0. The higher number means higher priority

![Add a WiFi Network](/steps/projects-and-devices/add_wifi_network.png)

You can also add a fallback WiFi network by clicking on **Add a fallback WiFi
NETWORK**, this network will be used in case all other networks are unavailable.

::: tip
For development purpose, it is strongly recommended that you set a second WiFi
network as a fallback, in case there are some errors. Maybe use your phone
wireless as a second WiFi.
:::

#### Cellular Configuration

You can add up to 2 cellular networks, for each network you have to specify in
order:

- The country to which the cellular network belongs
- The network ID (generally the provider name)
- The APN used for this network ID

Once you choosed the APN, fields 'Plan' and 'Usage' will be filled with the
corresponding data. Use this data to confirm that APN you choosed is really the
one you are aiming to use.

![Add a Cellular Network](/steps/projects-and-devices/add_cellular_network.gif)

::: warning
Selecting an incorrect plan may result in billing issues for your account or
prevent connectivity.
:::

#### Connectivity Check

If you have cellular connectivity problems or even WiFi related ones, the
*Connectivity Check* feature will allow you to:

- Monitor connectivity,
- Try to recover,
- Or reconfigure the connectivity,
- And if all fails, reboot the device again.

However rebooting devices should be last resort operation, usually reconfiguring
connectivity will solve the problem.

The *Connectiviy Check* feature supports 4 parameters:

1. The interval between two successive connectivity checks
2. The number of failed connectivity checks that will trigger a network reconfiguration
3. The maximum number of failed network connectivity and reconfiguration that will
   trigger the *Failure Action*
4. The *Failure Action* to perform on connectivity and reconfiguration limit

![Configure Connectivity
Checks](/steps/projects-and-devices/connectivity-checks.png)

The *network reconfiguration* operation will:

- Reset all *Network Manager* connections
- Reset all GSM modems and *Modem Manager* connections

The *Failure Action* supports the following operations:

- **No action (by default)**: do not take any action, device state may stay in failure until
  connectiviy is back
- **Normal reboot**: perform a normal reboot operation
- **Force reboot**: perform a forced reboot operation by terminating all processes,
  should cause no dirty file systems
- **Immediate reboot**: similar to a hardware reboot, which might result in data loss
- **Normal poweroff**: perform a normal poweroff operation
- **Force poweroff**: perform a forced poweroff operation by terminating all processes
- **Immediate poweroff**: similar to a hardware poweroff operation, which might
  result in data loss

To be supported soon:

- **Exit**: performs a `systemd` service manager exit call. Use this only with
  enabled hardware watchdog
- **Force exit**: porforms a forced exit by `systemd` the service manager. Use this
  only with enabled hardware watchdog

#### Boot Configuration

Here you can specify the kernel boot options.

