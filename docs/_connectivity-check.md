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

