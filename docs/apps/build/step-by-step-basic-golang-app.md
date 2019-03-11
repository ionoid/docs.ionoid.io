# Basic Hello world app in golang.

Because in golang we can create a self contained binary we dont need an environment,
so it will be enought to create the binary file accompagned with it's yaml file as following

## Create a directory for the project and bin folder to contain our binary file

```bash
mkdir -p golang-hello-world/bin
```

## Copy your hello world binary file to golang-hello-world/bin

## Create yaml file that represent the project

The content of the `app.yaml` file would be:
```
name: hello-world
version: 1.0
apps:
        hello-world:
                command:        /bin/hello-world
```

So now if we execute an ls inside our working direoctory we will get:
```bash
ls -a ./golang-hello-world
```
Result:
        
        ./app.yaml
        ./bin:
        .  ..  hello-world

## Compress the result as tar file 

```bash
tar -cvf ../hello-world-golan-armv7-v0.2.tar ./golang-hello-world/*
```

The `hello-world-golan-armv7-v0.2.tar` is our final App that can be deployed
to our IoT Devices.        

Last step are to host our tar file and use the link inside your dashboard account
as specified [in the doc](https://docs.ionoid.io/#/../DeployApp/deployApp?id=deploy-iot-applications-using-ionoid-iot-platform)