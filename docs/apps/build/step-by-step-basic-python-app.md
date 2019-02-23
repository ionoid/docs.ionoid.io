## Building a basic python hello world app

After [building your basic environnement](http://localhost:3000/#/apps/build/step-by-step-basic-environnement?id=building-a-basic-runtime-based-on-alpine-linux-quickly) with PROJECT_NAME="BasicPythonApp" 
execute a chroot as following:

```bash
sudo chroot build/BasicPythonApp/chroot/ /bin/sh -l
```

To find yourself inside your new environnement where we can now install Python

## Install Python

Installing Python

```bash 
apk add --no-cache python3
```
  - Install pip, the python package manager.

```
apk add --no-cache py-pip
```

## Create Python file of our app

For convention we will save our python source code on /usr/local/bin,
And reference it on it's YAML file.

So we start by creating our hello python app with hello-world as file name

```python
#!/usr/bin/python3

import time 

while True:
	print("Hello wolrd !")
	time.sleep(5)

```

## Creating YAML file

After creating source code of our app it's time to create the YAML file 
corresponding to it and saving it in the root filesystem of our environnement 
with app.yaml as file name

```yaml
name: hello-world-python3
version: 0.1

apps:
        hello-world-python3:
                command: /usr/local/bin/hello-world

```
## Conclution

You have now your environnement and inside it you just created a python file on /usr/local/bin
and a YAML file named app.yaml on / 

To finish our app we need to package it by compressing it with a simple tar command as following

```bash
sudo tar cvvf python3-alpine-armhf.tar -C python-runtime/chroot/ .
```

Congratulation for your effort, now all you need is a to host your tar file to give it to your ionoid dashboard
and the rest is magic.