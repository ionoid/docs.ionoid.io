# Debugging SealOS Manager 

To debug Sealos Manager.

- Connect to your device via ssh.

```bash 
$ ssh -l pi 192.168.1.10
```

- Use the following command.

```bash
$ sudo systemctl status
```

```bash
sudo journalctl -b -u sealos-manager
```

```bash
sudo journalctl -b -u sealos-manager-actions
```

