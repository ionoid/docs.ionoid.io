::: tip Requirements to build and extract Docker images

1. Install Docker and buildx for multi-architectures following this tutorial:

[docker and buildx for multi-architecture
images](
https://www.docker.com/blog/getting-started-with-docker-for-arm-on-linux/), then
register Arm executables or other architectures to run on x64 machines.

2. Enable Docker experimental features:

```bash
sudo nano /etc/docker/daemon.json
```

Then add the experimental feature there:

```json
{
  "experimental": true
}
```

3. Save and restart Docker:

```bash
sudo systemctl restart docker
```

3. Install [undocker](https://pypi.org/project/undocker/) which allows to
extract Docker image layers to a directory. Read more on [github](
https://github.com/larsks/undocker).

:::
