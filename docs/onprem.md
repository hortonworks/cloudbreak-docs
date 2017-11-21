# Install Cloudbreak Deployer

Follow these steps to install Cloudbreak Deployer on your operating system. 

>The instructions below are for CentOS. If you are using a differnt OS, perform equivalent steps. 

## System Requirements

To run the Cloudbreak Deployer and install the Cloudbreak application, your system must meet the following requirements:

  * RHEL / CentOS / Oracle Linux 7 (64-bit)
  * Docker 1.9.1
  * VM requirements:
    * 8GB RAM
    * 10GB disk
    * 2 cores

> You can install Cloudbreak on **Mac OS X for evaluation purposes only**. This operating system is not supported
for a production deployment of Cloudbreak.

## Prerequisites

You must satisfy the following preprequisites before installing the Cloudbreak Deployer.

#### Ports 
Make sure that the following ports are open:

* SSH (22)
* Cloudbreak (443)

#### Root Access  

Execute every command as **root**. In order to get root privileges execute:

```
sudo -i
```

#### System Updates

Ensure that your system is up-to-date and reboot it if necessary (for example, if there was a kernel update):

```
yum -y update
```
#### Iptables

Install iptables-services. Without iptables-services installed the 'iptables save' command will not be available:

```
yum -y install iptables-services net-tools
```

Then, configure permissive iptables on your machine:

```
iptables --flush INPUT && \
iptables --flush FORWARD && \
service iptables save
```
#### Docker Service

Configure a custom Docker repository for installing the correct version of Docker:

```
cat > /etc/yum.repos.d/docker.repo <<"EOF"
[dockerrepo]
name=Docker Repository
baseurl=https://yum.dockerproject.org/repo/main/centos/7
enabled=1
gpgcheck=1
gpgkey=https://yum.dockerproject.org/gpg
EOF
```

Next, install the Docker service:

```
yum install -y docker-engine-1.9.1 docker-engine-selinux-1.9.1
systemctl start docker
systemctl enable docker
```
## Cloudbreak Deployer Installation

#### Install Cloudbreak Deployer

Install the Cloudbreak Deployer and unzip the platform-specific single binary to your PATH. For example:

```
yum -y install unzip tar
curl -Ls s3.amazonaws.com/public-repo-1.hortonworks.com/HDP/cloudbreak/cloudbreak-deployer_1.16.5_$(uname)_x86_64.tgz | sudo tar -xz -C /bin cbd
cbd --version
```

Once the Cloudbreak Deployer is installed, you can set up the Cloudbreak application.

#### Initialize Your Profile

Initialize `cbd` by using:

```
mkdir cloudbreak-deployment
cd cloudbreak-deployment
```

First, initialize `cbd` by creating a `Profile` file with the following content:

```
export UAA_DEFAULT_SECRET='[SECRET]'
export UAA_DEFAULT_USER_PW='[PASSWORD]'
```
By default the `cbd` tool tries to guess `PUBLIC_IP` to bind Cloudbreak UI to it. But if `cbd` cannot get the IP address during the initialization, set the appropriate value also in your `Profile`.


#### Generate Your Profile

Generate configurations by executing:

```
rm *.yml
cbd generate
```

This creates the following configuration files:

- The **docker-compose.yml** file that describes the configurations of all the Docker containers required for the Cloudbreak deployment.
- The **uaa.yml** file that holds the configurations of the identity server used to authenticate users to Cloudbreak.


#### Start Cloudbreak Application

To start the Cloudbreak application, use the following command:

```
cbd pull
cbd start
```

This will start all the Docker containers and initialize the Cloudbreak application. It will take a few minutes for all the services to start.

>The first time you start the Coudbreak app, the process will take longer than usual due to the download of all the necessary docker images.

After the `cbd start` command finishes, use this command to check the logs of the Cloudbreak application:

```
cbd logs cloudbreak
```
You should see a message like this in the log: `Started CloudbreakApplication in 36.823 seconds`. Cloudbreak normally takes less than a minute to start. 


## Troubleshooting

If you face permission or connection issues, disable **SELinux**:

  1. Set the `SELINUX=disabled` in `/etc/selinux/config`.
  2. Reboot the machine.
  3. Ensure the SELinux is not turned on afterwards:

```
setenforce 0 && sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/ selinux/config
```

## Next Steps

After you have installed Cloudbreak Deployer, perform cloud provider specific configurations and then provision a cluster. See **cloud provider specific** steps:

 * [AWS](aws.md#aws-setup)
 * [Azure](azure.md)
 * [GCP](gcp.md#google-setup)
 * [OpenStack](openstack.md#openstack-setup)

> **Note:** AWS and OpenStack Setup sections contain provider-specific and other additional `Profile` settings.
