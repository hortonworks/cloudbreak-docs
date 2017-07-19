# Cloudbreak Shell

The Cloudbreak Shell is an interactive command line tool which supports:

* All functionality available through the REST API or Cloudbreak web UI
* Complete automation of management tasks via **scripts**
* Context-aware commands
* Required/optional parameters
* Tab completion
* The **hint** command that guides you when you need help

## Install and Start Cloudbreak Shell

Install Cloudbreak shell using one of the following options:

- [Install Cloudbreak Shell Using Cloudreak Deployer](#deployer) (Recommended) 
- [Use Our Prepared Docker Image](#dockerimage)
- [Build From Source](#fromsource)

<a name="deployer"></a>
### Install Cloudbreak Shell Using Cloudbreak Deployer

Start the shell with `cbd util cloudbreak-shell`. This will launch the Cloudbreak shell inside a Docker container, and you can start using it.


<a name="dockerimage"></a>
### Use Our Prepared Docker image

You can find the docker image and its documentation [here](https://github.com/sequenceiq/docker-cb-shell).

<a name="fromsource"></a>
### Build from Source

If want to use the code or extend it with new commands, follow the steps below.

**Prerequisites:** JDK 1.8.  

Execute the folowing commands:

```
git clone https://github.com/hortonworks/cloudbreak.git
cd cloudbreak/shell
../gradlew clean build
```

> **Note: **
> If you use the hosted version of Cloudbreak, use `latest-release.sh` to get the right version of the CLI.

Start Cloudbreak-shell from the build source using:

```
Usage:
  java -jar cloudbreak-shell-0.5-SNAPSHOT.jar                  : Starts Cloudbreak Shell in interactive mode.
  java -jar cloudbreak-shell-0.5-SNAPSHOT.jar --cmdfile=<FILE> : Cloudbreak executes commands read from the file.

Options:
  --cloudbreak.address=<http[s]://HOSTNAME:PORT>  Address of the Cloudbreak Server [default: https://cloudbreak-api.sequenceiq.com].
  --identity.address=<http[s]://HOSTNAME:PORT>    Address of the SequenceIQ identity server [default: https://identity.sequenceiq.com].
  --sequenceiq.user=<USER>                        Username of the SequenceIQ user [default: user@sequenceiq.com].
  --sequenceiq.password=<PASSWORD>                Password of the SequenceIQ user [default: password].
```
 
> **Note: **
> You should specify at least your username and password.

Once you are connected, you can create a cluster. Use `hint` if you get lost or need guidance through the process. Use <kbd>TAB</kbd> for completion.

> **Note: **
> All commands are **context-aware**, which means that they are available only when they are relevant. This way the system guides you nad keeps you on the right path.

## Connect Cloudbreak Shell with a Remote Cloudbreak Instance

**Prerequisites:** Docker is installed and running on the local machine
 
1. Execute `cbd util cloudbreak-shell-remote` on the remote host.
2. Execute the result of the previous command on the local machine.


## Documentation 

For **complete documentation** of the Cloudbreak shell, see Cloudbreak  [github repository](https://github.com/hortonworks/cloudbreak/tree/master/shell).

For **Provider-specific Documentation**, see:

- [AWS](aws.md#interactive-mode-cloudbreak-shell)
- [Azure](azure.md#interactive-mode-cloudbreak-shell)
- [GCP](gcp.md#interactive-mode-cloudbreak-shell)
- [OpenStack](openstack.md#interactive-mode-cloudbreak-shell)
