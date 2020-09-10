::: Requirements to build and extract docker images

1. Install docker and buildx for multi-architectures following this tutorial: 
[docker and buildx for multi-architecture
images](https://www.docker.com/blog/getting-started-with-docker-for-arm-on-linux/), then register
Arm executables or other architectures to run on x64 machines.

2. Enable docker experimental features:
```bash
sudo nano /etc/docker/daemon.json
```

Then add the experimental feature there:
```json
{
"experimental": true
}
```

Save and restart docker:
```bash
sudo systemctl restart docker
```


3. Install [undocker](https://pypi.org/project/undocker/) which allows to extract docker image layers to a directory.
[undocker github](https://github.com/larsks/undocker).

:::
