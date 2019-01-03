# Debugging SealOS Manager 

To debug Sealos Manager, connect your system device via ssh and use the following commands.


```bash
$ sudo systemctl status
```

```bash
sudo journalctl -b -u sealos-manager
```

```bash
sudo journalctl -b -u sealos-manager-actions
```

