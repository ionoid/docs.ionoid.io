
# Prepare a Build Environment.

This section describes how to set up your work environment to build the runtime for your IoT apps. You must use Linux. 
For building under MacOS or Windows see Docker section. 


Before creating runtime, we have install tools and prepare environment that make it easy.

## Preparing your build environment on GNU/Linux 

To prepare your build environment for creating runtimes, obtain the following tools if you haven't done so already.


## GNU/Linux system.

### 1. Installing dependencies 

 - on Debian/Ubuntu distro. 


```bash 
sudo apt-get install dosfstools gnupg pandoc parted python3-pip python3-setuptools python3-yaml qemu-user-static rsync uuid-runtime wget whois
```


 - on Fedora distro.


```bash 
sudo dnf install dosfstools dpkg expect gpg pandoc parted python3-pip python3-PyYAML python3-setuptools qemu-user-static rsync wget
```

### 2. Clone Pieman git repository.

```bash
git clone https://github.com/tolstoyevsky/pieman.git
```

 ### 3. Install the required utilities and modules written in Python.

```bash 
 sudo pip3 install pieman 
```

## Docker 
 - todo   

# Conclusion 

Now we have a build environment for runtime creation , in the next section we will see how to build a basic runtime
based on Linux Alpine distro.
