# Install Cloudbreak Deployer

Follow these steps to install Cloudbreak Deployer on your operating system. 

> The instructions below are for CentOS. If you are using a differnt OS, perform equivalent steps. 

## Minimum and Recommended System Requirements

To run the Cloudbreak Deployer and install the Cloudbreak Application, you must meet the following requirements:

  * RHEL / CentOS / Oracle Linux 7 (64-bit)
  * Docker 1.9.1
  * Minimum and Recommended VM requirements:
    * 8GB RAM
    * 10GB disk
    * 2 cores

> You can install Cloudbreak on **Mac OS X for evaluation purposes only**. This operating system is not supported
for a production deployment of Cloudbreak.

Make sure that you have opened the following ports:

 * SSH (22)
 * Cloudbreak API (8080)
 * Identity server (8089)
 * Cloudbreak GUI (3000)
 * User authentication (3001)

Execute every command as **root**. In order to get root privileges execute:

```
sudo -i
```

Ensure that your system is up-to-date and reboot it if necessary (for example, if there was a kernel update):

```
yum -y update
```

Install iptables-services. Without iptables-services installed the 'iptables save' command will not be available:

```
yum -y install iptables-services net-tools
```

Configure permissive iptables on your machine:

```
iptables --flush INPUT && \
iptables --flush FORWARD && \
service iptables save
```

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

## Install Cloudbreak Deployer

Install the Cloudbreak Deployer and unzip the platform-specific single binary to your PATH. A quick way to do this is:

```
yum -y install unzip tar
curl -Ls s3.amazonaws.com/public-repo-1.hortonworks.com/HDP/cloudbreak/cloudbreak-deployer_1.2.2_$(uname)_x86_64.tgz | sudo tar -xz -C /bin cbd
cbd --version
```

Once the Cloudbreak Deployer is installed, you can start to set up the Cloudbreak application.

## Initialize Your Profile

First initialize `cbd`:

```
mkdir cloudbreak-deployment
cd cloudbreak-deployment
cbd init
```

This will create a `Profile` file in the current directory. Open the `Profile` file and check the `PUBLIC_IP`. Cloudbreak UI uses the `PUBLIC_IP` to access the Cloudbreak UI. In some cases, the `cbd` tool tries to guess it. If `cbd` did not get the IP address during the initialization, set the appropriate value.



## Generate Your Profile

You are done with the configuration of Cloudbreak Deployer. The last thing you have to do is to generate the configurations by executing:

```
rm *.yml
cbd generate
```

This step creates the following configurations:

- Creates the **docker-compose.yml** file that describes the configuration of all the Docker containers needed for the Cloudbreak deployment.
- Creates the **uaa.yml** file that holds the configuration of the identity server used to authenticate users to Cloudbreak.

## Start Cloudbreak

To start the Cloudbreak application use the following command:

```
cbd pull
cbd start
```

This will start all the Docker containers and initialize the application. It will take a few minutes for all the services to start.

>The first time you start the Coudbreak app, the process will take longer than usual due to the download of all the necessary docker images.

After the `cbd start` command finishes, use this command to check the logs of the Cloudbreak application:

```
cbd logs cloudbreak
```

You should see a message like this in the log: `Started CloudbreakApplication in 36.823 seconds`. Cloudbreak normally takes less than a minute to start. 


## Troubleshooting

If you are faced with permission or connection issues, try to disable **SELinux**:

  1. Set the `SELINUX=disabled` in `/etc/selinux/config`
  2. Reboot the machine
  3. Ensure the SELinux is not turned on afterwards.

```
setenforce 0 && sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
```

## Next Steps

After you have met all the pre-requisites for Cloudbreak, perform the **cloud provider specific** configuration. Select your cloud  provider and follow the steps in the **Setup** section:

 * [AWS](aws.md#aws-setup)
 * [Azure](azure.md)
 * [GCP](gcp.md#google-setup)
 * [OpenStack](openstack.md#openstack-setup)

> AWS and OpenStack Setup sections contain additional and provider-specific `Profile` settings.
