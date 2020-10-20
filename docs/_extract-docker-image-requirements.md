Before exporting Docker images, make sure to have all the required tools
installed:

::: tip
Run the following commands with `sudo` whenever it is necessary.
:::

- Install Docker and buildx for multi-architectures using the following
  tutorial: [docker and buildx for multi-architecture images](
  https://www.docker.com/blog/getting-started-with-docker-for-arm-on-linux/),
  then register `Arm` executables or other architectures to run on x64 machines.

- Enable Docker experimental features by editing (create it if not present) the
  file `/etc/docker/daemon.json` with your favorite text editor (here we use
  `nano`):

  ```bash
  sudo nano /etc/docker/daemon.json
  ```

  Then add the experimental feature there:

  ```json
  {
    "experimental": true
  }
  ```

- Save the file and restart Docker:

  ```bash
  sudo systemctl restart docker
  ```

- Install [undocker](https://github.com/larsks/undocker) which allows to extract
  Docker image layers to a directory:

  ```bash
  pip3 install undocker
  ```

  Use `sudo` if required.

