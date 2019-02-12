
# Prepare a Build Environment.

This section describes how to set up your work environment to build runtime for your IoT apps. You must use Linux. 
For building under MacOS or Windows see Docker section. 

> We are using <a href="https://github.com/tolstoyevsky/pieman" target="_blank"> Pieman </a>, a script for creating OS images for single-board computers such as Raspberry Pi.

The procedure to prepare a build environment is as follow: 

1. Installing dependencies.
2. Clone Pieman git repository.
3. Installing the required utilities and modules.


## Preparing your build environment on GNU/Linux 

To prepare your build environment several prerequisites for working with pieman must be installed, obtain the following tools if you haven't done so already.


## 1. Installing dependencies 

 - To install dependencies on Debian/Ubuntu distro open a terminal and  run the following commmand. 


```bash 
sudo apt-get install dosfstools gnupg pandoc parted python3-pip python3-setuptools python3-yaml qemu-user-static rsync uuid-runtime wget whois
```


 - To install dependencies on Fedora distro open a terminal run the following command.


```bash 
sudo dnf install dosfstools dpkg expect gpg pandoc parted python3-pip python3-PyYAML python3-setuptools qemu-user-static rsync wget
```

## 2. Clone Pieman git repository.

 - To get Pieman run the following command.

```bash
git clone https://github.com/tolstoyevsky/pieman.git
```

## 3. Install the required utilities and modules written in Python.

```bash 
 sudo pip3 install pieman 
```

## Docker 
 - todo   

# Conclusion 

Now we have a build environment to create runtimes , in the next section we will see how to build a basic runtime based on Linux Alpine distro.
