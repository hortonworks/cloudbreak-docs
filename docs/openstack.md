# OpenStack Cloud Images

> This feature is currently `TECHNICAL PREVIEW` and is available for the `OpenStack Juno` release.

We have pre-built cloud images for OpenStack with the Cloudbreak Deployer pre-installed. Following the steps will guide you through the provider specific configuration then launch.

> Alternatively, instead of using the pre-built cloud images, you can install Cloudbreak Deployer on your own VM. See [install the Cloudbreak Deployer](onprem.md) for more information.

##Configured Image 

You can download the latest pre-configured Cloudbreak Deployer image for OpenStack with the following script in the 
following section.

Please make sure you opened the following ports on your network:
 
 * SSH (22)
 * Cloudbreak API (8080)
 * Identity server (8089)
 * Cloudbreak GUI (3000)
 * User authentication (3001)

###Cloudbreak Deployer OpenStack Image Details


##Import the image into OpenStack

```
export OS_IMAGE_NAME="name_in_openstack"
export OS_USERNAME=...
export OS_AUTH_URL="http://.../v2.0"
export OS_TENANT_NAME=...
glance image-create --name "$OS_IMAGE_NAME" --file "$LATEST_IMAGE" --disk-format qcow2 --container-format bare --progress
```

#OpenStack Setup

  * Default user is cloudbreak
  * Cloudbreak Deployer location is `/var/lib/cloudbreak-deployment`.
  * All `cbd` actions must be executed from the `cbd` folder.
  * Most of the `cbd` commands require `root` permissions.

## Setup Cloudbreak Deployer

> This feature is currently `TECHNICAL PREVIEW` and is available for the `OpenStack Juno` release.

If you already have Cloudbreak Deployer either by [using the OpenStack Cloud Images](openstack.md) or by [installing the Cloudbreak Deployer](onprem.md) manually on your own VM,
you can start to setup the Cloudbreak Application with the deployer.

Create and open the `cloudbreak-deployment` directory:

```
cd cloudbreak-deployment
```

This is the directory of the config files and the supporting binaries that will be downloaded by Cloudbreak deployer.

###Initialize your Profile

First initialize your directory by creating a `Profile` file:

```
cbd init
```

It will create a `Profile` file in the current directory. Please edit the file - one of the required configurations is the `PUBLIC_IP`.
This IP will be used to access the Cloudbreak UI (called Uluwatu). In some cases the `cbd` tool tries to guess it, if can't than will give a hint.

The other required configuration in the `Profile` is the name of the Cloudbreak image you uploaded to your OpenStack cloud.

```
export CB_OPENSTACK_IMAGE="$OS_IMAGE_NAME"
```

###Start Cloudbreak

To start the Cloudbreak application use the following command.
This will start all the Docker containers and initialize the application. It will take a few minutes until all the services start.

```
cbd start
```

>Launching it first will take more time as it downloads all the docker images needed by Cloudbreak.

The `cbd start` command includes the `cbd generate` command which applies the following steps:

- creates the **docker-compose.yml** file that describes the configuration of all the Docker containers needed for the Cloudbreak deployment.
- creates the **uaa.yml** file that holds the configuration of the identity server used to authenticate users to Cloudbreak.


After the `cbd start` command finishes you can check the logs of the Cloudbreak server with this command:

```
cbd logs cloudbreak
```
>Cloudbreak server should start within a minute - you should see a line like this: `Started CloudbreakApplication in 36.823 seconds`

###Next steps

Once Cloudbreak is up and running you should check out the Provisioning Prerequisites which needed to create OpenStack clusters with Cloudbreak.

#Provisioning Prerequisites

## Generate a new SSH key

All the instances created by Cloudbreak are configured to allow key-based SSH,
so you'll need to provide an SSH public key that can be used later to SSH onto the instances in the clusters you'll create with Cloudbreak.
You can use one of your existing keys or you can generate a new one.

To generate a new SSH keypair:

```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# Creates a new ssh key, using the provided email as a label
# Generating public/private rsa key pair.
```

```
# Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
You'll be asked to enter a passphrase, but you can leave it empty.

# Enter passphrase (empty for no passphrase): [Type a passphrase]
# Enter same passphrase again: [Type passphrase again]
```

After you enter a passphrase the keypair is generated. The output should look something like below.
```
# Your identification has been saved in /Users/you/.ssh/id_rsa.
# Your public key has been saved in /Users/you/.ssh/id_rsa.pub.
# The key fingerprint is:
# 01:0f:f4:3b:ca:85:sd:17:sd:7d:sd:68:9d:sd:a2:sd your_email@example.com
```

Later you'll need to pass the `.pub` file's contents to Cloudbreak and use the private part to SSH to the instances.

## Download and import the Cloudbreak image

###OpenStack Cloudbreak image details

###Import the image into OpenStack

```
export OS_IMAGE_NAME="name_in_openstack"
export OS_USERNAME=...
export OS_AUTH_URL="http://.../v2.0"
export OS_TENANT_NAME=...
glance image-create --name "$OS_IMAGE_NAME" --file "$LATEST_IMAGE" --disk-format qcow2 --container-format bare --progress
```

> **IMPORTANT:** Make sure that you have sufficient qouta (CPU, network, etc) for the requested cluster size.

#Provisioning via Browser

You can log into the Cloudbreak application at http://PUBLIC_IP:3000.

The main goal of the Cloudbreak UI is to easily create clusters on your own cloud provider account.
This description details the OpenStack setup - if you'd like to use a different cloud provider check out its manual.

This document explains the four steps that need to be followed to create Cloudbreak clusters from the UI:

- connect your OpenStack with Cloudbreak
- create some template resources on the UI that describe the infrastructure of your clusters
- create a blueprint that describes the HDP services in your clusters and add some recipes for customization
- launch the cluster itself based on these template resources

## Manage cloud credentials

You can now log into the Cloudbreak application at http://PUBLIC_IP:3000. Once logged in go to **Manage credentials**. Using manage credentials will  link your cloud account with the Cloudbreak account.

`Name:` name of your credential

`Description:` short description of your linked credential

`User:` your OpenStack user

`Password:` your password

`Tenant Name:` OpenStack tenant name

`Endpoint:` Openstack Identity Service (Keystone) endpont (e.g. http://PUBLIC_IP:5000/v2.0)

`SSH public key:` the SSH public certificate in OpenSSH format that's private keypair can be used to [log into the launched instances](http://sequenceiq.com/cloudbreak-deployer/1.1.0/insights/#ssh-to-the-host) later with the **ssh username: centos**

`Public in account:` share it with others in the account


## Infrastructure templates

After your OpenStack is linked to Cloudbreak you can start creating templates that describe your clusters' infrastructure:

- resources
- networks
- security groups

When you create a template, Cloudbreak *doesn't make any requests* to OpenStack.
Resources are only created on OpenStack after the `create cluster` button is pushed.
These templates are saved to Cloudbreak's database and can be reused with multiple clusters to describe the infrastructure.

**Manage resources**

Using manage resources you can create infrastructure templates. Templates describes the infrastructure where the HDP cluster will be provisioned. We support heterogenous clusters - this means that one cluster can be built by combining different templates.

`Name:` name of your template

`Description:` short description of your template

`Instance type:` the OpenStack instance type to be used

`Attached volumes per instance:` the number of disks to be attached

`Volume size (GB):` the size of the attached disks (in GB)

`Public in account:` share it with others in the account

**Manage blueprints**

Blueprints are your declarative definition of a Hadoop cluster.

`Name:` name of your blueprint

`Description:` short description of your blueprint

`Source URL:` you can add a blueprint by pointing to a URL. As an example you can use this [blueprint](https://github.com/sequenceiq/ambari-rest-client/raw/1.6.0/src/main/resources/blueprints/multi-node-hdfs-yarn).

`Manual copy:` you can copy paste your blueprint in this text area

`Public in account:` share it with others in the account

**Manage networks**

Manage networks allows you to create or reuse existing networks and configure them.

`Name:` name of the network

`Description:` short description of your network

`Subnet (CIDR):` a subnet with CIDR block under the given `public network`

`Public network ID:` id of an OpenStack public network

Optional parameters (reuse existing network and subnet, in case of existing subnet all 3 parameters must be provided, with new subnet only 2 required):

`Virtual Network Identifier:` provide an id of an existing virtual network to reuse

`Router Identifier:` id of the router which belongs to the existing virtual network (must be provided in case of existing virtual network)

`Subnet Identifier:` id of a subnet within the existing virtual network, the provided subnet CIDR will be ignored and the existing subnet's CIDR range will be used (leave it blank if you'd like to create a new subnet within the virtual network with the provided subnet CIDR range)

`Public in account:` share it with others in the account

**Security groups**

They describe the allowed inbound traffic to the instances in the cluster.
Currently only one security group template can be selected for a Cloudbreak cluster and all the instances have a public IP address so all the instances in the cluster will belong to the same security group.
This may change in a later release.

You can define your own security group by adding all the ports, protocols and CIDR range you'd like to use. 443 needs to be there in every security group otherwise Cloudbreak won't be able to communicate with the provisioned cluster. The rules defined here doesn't need to contain the internal rules, those are automatically added by Cloudbreak to the security group on OpenStack.

You can also use the two pre-defined security groups in Cloudbreak:

`only-ssh-and-ssl:` all ports are locked down (you can't access Hadoop services outside of the Virtual Private Cloud) but

* SSH (22)
* HTTPS (443)

`all-services-port:` all Hadoop services + SSH/gateway HTTPS are accessible by default:

* SSH (22)
* HTTPS (443)
* Ambari (8080)
* Consul (8500)
* NN (50070)
* RM Web (8088)
* Scheduler (8030RM)
* IPC (8050RM)
* Job history server (19888)
* HBase master (60000)
* HBase master web (60010)
* HBase RS (16020)
* HBase RS info (60030)
* Falcon (15000)
* Storm (8744)
* Hive metastore (9083)
* Hive server (10000)
* Hive server HTTP (10001)
* Accumulo master (9999)
* Accumulo Tserver (9997)
* Atlas (21000)
* KNOX (8443)
* Oozie (11000)
* Spark HS (18080)
* NM Web (8042)
* Zeppelin WebSocket (9996)
* Zeppelin UI (9995)
* Kibana (3080)
* Elasticsearch (9200)

If `Public in account` is checked all the users belonging to your account will be able to use this security group template to create clusters, but cannot delete or modify it.

**Note** that the security groups are *not created* on OpenStack after the `Create Security Group` button is pushed, only after the cluster provisioning starts with the selected security group template.

## Cluster installation

This section describes

**Blueprints**

Blueprints are your declarative definition of a Hadoop cluster. These are the same blueprints that are [used by Ambari](https://cwiki.apache.org/confluence/display/AMBARI/Blueprints).

You can use the 3 default blueprints pre-defined in Cloudbreak or you can create your own.
Blueprints can be added from an URL or the whole JSON can be copied to the `Manual copy` field.

The hostgroups added in the JSON will be mapped to a set of instances when starting the cluster and the services and components defined in the hostgroup will be installed on the corresponding nodes.
It is not necessary to define all the configuration fields in the blueprints - if a configuration is missing, Ambari will fill that with a default value.
The configurations defined in the blueprint can also be modified later from the Ambari UI.

If `Public in account` is checked all the users belonging to your account will be able to use this blueprint to create clusters, but cannot delete or modify it.

A blueprint can be exported from a running Ambari cluster that can be reused in Cloudbreak with slight modifications.
There is no automatic way to modify an exported blueprint and make it instantly usable in Cloudbreak, the modifications have to be done manually.
When the blueprint is exported some configurations will have for example hardcoded domain names, or memory configurations that won't be applicable to the Cloudbreak cluster.

**Cluster customization**

Sometimes it can be useful to define some custom scripts that run during cluster creation and add some additional functionality.
For example it can be a service you'd like to install but it's not supported by Ambari or some script that automatically downloads some data to the necessary nodes.
The most notable example is Ranger setup: it has a prerequisite of a running database when Ranger Admin is installing.
A PostgreSQL database can be easily started and configured with a recipe before the blueprint installation starts.

To learn more about these so called *Recipes*, and to check out the Ranger database recipe, take a look at the [Cluster customization](recipes.md) part of the documentation.


## Cluster deployment

After all the templates are configured you can deploy a new HDP cluster. Start by selecting a previously created credential in the header.
Click on `create cluster`, give it a `Name`, select a `Region` where the cluster infrastructure will be provisioned and select one of the `Networks` and `Security Groups` created earlier.
After you've selected a `Blueprint` as well you should be able to configure the `Template resources` and the number of nodes for all of the hostgroups in the blueprint.

If `Public in account` is checked all the users belonging to your account will be able to see the newly created cluster on the UI, but cannot delete or modify it.

If `Enable security` is checked as well, Cloudbreak will install Key Distribution Center (KDC) and the cluster will be Kerberized. See more about it in the [Kerberos](kerberos.md) section of this documentation.

After the `create and start cluster` button is pushed Cloudbreak will start to create resources on your OpenStack.

>**Important** Always use Cloudbreak to delete the cluster. If that fails for some reason, always try to delete via 
OpenStack Dashboard.

**Advanced options**:

`Consul server count:` the number of Consul servers (add number), by default is 3. It varies with the cluster size.

`Platform variant:` Cloudbreak provides two implementation for creating OpenStack cluster

* `HEAT:` using heat template to create the resources
* `NATIVE:` using API calls to create the resources

`Minimum cluster size:` the provisioning strategy in case of the cloud provider can't allocate all the requested nodes

`Validate blueprint:` feature to validate or not the Ambari blueprint. By default is switched on.

`Config recommendation strategy:` Specifies the strategy for how configuration recommendations may be applied to a cluster’s configuration. Recommended configurations gathered by the response of the stack advisor. 

* `NEVER_APPLY:`               Configuration recommendations are ignored with this option.
* `ONLY_STACK_DEFAULTS_APPLY:` Applies only on the default configurations for all included services.
* `ALWAYS_APPLY:`              Applies on all configuration properties.

Once you have launched the cluster creation you can track the progress either on Cloudbreak UI or your cloud provider management UI.

## Next steps

Congrats! Your cluster should now be up and running. To learn more about it we have some [interesting insights](operations.md) about Cloudbreak clusters.

## Cluster termination

You can terminate running or stopped clusters with the `terminate` button in the cluster details.

Sometimes Cloudbreak cannot synchronize it's state with the cluster state at the cloud provider and the cluster can't be terminated. In this case with the `Forced termination` option in the termination dialog box you can terminate the cluster at the Cloudbreak side anyway. **In this case you may need to manually remove resources at the cloud provider.**

# Interactive mode

Start the shell with `cbd util cloudbreak-shell`. This will launch the Cloudbreak shell inside a Docker container and you are ready to start using it.

You have to copy files into the cbd working directory, which you would like to use from shell. For example if your `cbd` working directory is `~/prj/cbd` then copy your blueprint and public ssh key file into this directory. You can refer to these files with their names from the shell.

### Create a cloud credential

```
credential create --OPENSTACK --name my-os-credential --description "credentail description" --userName <OpenStack username> --password <OpenStack password> --tenantName <OpenStack tenant name> --endPoint <OpenStack Identity Service (Keystone) endpoint> --sshKeyPath <path of your public SSH key file>
```

Alternatively you can upload your public key from an url as well, by using the `—sshKeyUrl` switch, or use the ssh string with `—sshKeyString` switch. You can check whether the credential was created successfully by using the `credential list` command. You can switch between your cloud credentials - when you’d like to use one and act with that you will have to use:

```
credential select --name my-openstack-credential
```

### Create a template

A template gives developers and systems administrators an easy way to create and manage a collection of cloud infrastructure related resources, maintaining and updating them in an orderly and predictable fashion. A template can be used repeatedly to create identical copies of the same stack (or to use as a foundation to start a new stack).

```
template create --OPENSTACK --name ostemplate --description openstack-template --instanceType m1.large --volumeSize 100 --volumeCount 2
```
You can check whether the template was created successfully by using the `template list` or `template show` command.

You can delete your cloud template - when you’d like to delete one you will have to use:
```
template delete --name ostemplate
```

### Create or select a blueprint

You can define Ambari blueprints with cloudbreak-shell:

```
blueprint add --name myblueprint --description myblueprint-description --file <the path of the blueprint>
```

Other available options:

`--url` the url of the blueprint

`--publicInAccount` flags if the network is public in the account

We ship default Ambari blueprints with Cloudbreak. You can use these blueprints or add yours. To see the available blueprints and use one of them please use:

```
blueprint list

blueprint select --name hdp-small-default
```

### Create a network

A network gives developers and systems administrators an easy way to create and manage a collection of cloud infrastructure related networking, maintaining and updating them in an orderly and predictable fashion. A network can be used repeatedly to create identical copies of the same stack (or to use as a foundation to start a new stack).

```
network create --OPENSTACK --name osnetwork --description openstack-network --publicNetID <id of an OpenStack public network> --subnet 10.0.0.0/16
```

Other available options:

`--publicInAccount` flags if the network is public in the account

You can check whether the network was created successfully by using the `network list` command. Check the network and select it if you are happy with it:

```
network show --name osnetwork

network select --name osnetwork
```

### Create a security group

A security group gives developers and systems administrators an easy way to create and manage a collection of cloud infrastructure related security rules.

```
securitygroup create --name secgroup_example --description securitygroup-example --rules 0.0.0.0/0:tcp:8080,9090;10.0.33.0/24:tcp:1234,1235
```

You can check whether the security group was created successfully by using the `securitygroup list` command. Check the security group and select it if you are happy with it:

```
securitygroup show --name secgroup_example

securitygroup select --name secgroup_example
```

There are two default security groups defined: `all-services-port` and `only-ssh-and-ssl`

`only-ssh-and-ssl:` all ports are locked down (you can't access Hadoop services outside of the Virtual Private Cloud)

* SSH (22)
* HTTPS (443)

`all-services-port:` all Hadoop services + SSH/gateway HTTPS are accessible by default:

* SSH (22)
* HTTPS (443)
* Ambari (8080)
* Consul (8500)
* NN (50070)
* RM Web (8088)
* Scheduler (8030RM)
* IPC (8050RM)
* Job history server (19888)
* HBase master (60000)
* HBase master web (60010)
* HBase RS (16020)
* HBase RS info (60030)
* Falcon (15000)
* Storm (8744)
* Hive metastore (9083)
* Hive server (10000)
* Hive server HTTP (10001)
* Accumulo master (9999)
* Accumulo Tserver (9997)
* Atlas (21000)
* KNOX (8443)
* Oozie (11000)
* Spark HS (18080)
* NM Web (8042)
* Zeppelin WebSocket (9996)
* Zeppelin UI (9995)
* Kibana (3080)
* Elasticsearch (9200)

### Configure instance groups

You have to configure the instancegroups before the provisioning. An instancegroup is defining a group of your nodes with a specified template. Usually we create instancegroups for the hostgroups defined in the blueprints.

```
instancegroup configure --instanceGroup host_group_slave_1 --nodecount 3 --templateName ostemplate
```

Other available options:

`--templateId` Id of the template

### Create a Hadoop cluster
You are almost done - two more command and this will create your Hadoop cluster on your favorite cloud provider. Same as the API, or UI this will use your `credential`, `instancegroups`, `network`, `securitygroup`, and by using OpenStack Heat will launch a cloud stack
```
stack create --name my-first-stack --region local
```
Once the `stack` is up and running (cloud provisioning is done) it will use your selected `blueprint` and install your custom Hadoop cluster with the selected components and services.
```
cluster create --description "my first cluster"
```
You are done - you can check the progress through the Ambari UI. If you log back to Cloudbreak UI you can check the progress over there as well, and learn the IP address of Ambari.

### Stop/Restart cluster and stack
You have the ability to **stop your existing stack then its cluster** if you want to suspend the work on it.

Select a stack for example with its name:
```
stack select --name my-stack
```
Other available option to define a stack is its `--id` (instead of the `--name`).

Apply the following commands to stop the previously selected stack:
```
cluster stop
stack stop
```
>**Important!** The related cluster should be stopped before you can stop the stack.


Apply the following command to **restart the previously selected and stopped stack**:
```
stack start
```
After the selected stack has restarted, you can **restart the related cluster as well**:
```
cluster start
```

### Upscale/Downscale cluster and stack
You can **upscale your selected stack** if you need more instances to your infrastructure:
```
stack node --ADD --instanceGroup host_group_slave_1 --adjustment 6
```
Other available options:

`--withClusterUpScale` indicates cluster upscale after stack upscale
or you can upscale the related cluster separately as well:
```
cluster node --ADD --hostgroup host_group_slave_1 --adjustment 6
```


Apply the following command to **downscale the previously selected stack**:
```
stack node --REMOVE  --instanceGroup host_group_slave_1 --adjustment -2
```
and the related cluster separately:
```
cluster node --REMOVE  --hostgroup host_group_slave_1 --adjustment -2
```

## Silent mode

With Cloudbreak shell you can execute script files as well. A script file contains cloudbreak shell commands and can be executed with the `script` cloudbreak shell command

```
script <your script file>
```

or with the `cbd util cloudbreak-shell-quiet` cbd command:

```
cbd util cloudbreak-shell-quiet < example.sh
```

## Example

The following example creates a hadoop cluster with `hdp-small-default` blueprint on `m1.large` instances with 2X100G attached disks on `osnetwork` network using `all-services-port` security group. You should copy your ssh public key file into your cbd working directory with name `id_rsa.pub` and change the `<...>` parts with your openstack credential and network details.

```
credential create --OPENSTACK --name my-os-credential --description "credentail description" --userName <OpenStack username> --password <OpenStack password> --tenantName <OpenStack tenant name> --endPoint <OpenStack Identity Service (Keystone) endpoint> --sshKeyPath <path of your public SSH key file>
credential select --name my-os-credential
template create --OPENSTACK --name ostemplate --description openstack-template --instanceType m1.large --volumeSize 100 --volumeCount 2
blueprint select --name hdp-small-default
instancegroup configure --instanceGroup cbgateway --nodecount 1 --templateName ostemplate
instancegroup configure --instanceGroup host_group_master_1 --nodecount 1 --templateName ostemplate
instancegroup configure --instanceGroup host_group_master_2 --nodecount 1 --templateName ostemplate
instancegroup configure --instanceGroup host_group_master_3 --nodecount 1 --templateName ostemplate
instancegroup configure --instanceGroup host_group_client_1  --nodecount 1 --templateName ostemplate
instancegroup configure --instanceGroup host_group_slave_1 --nodecount 3 --templateName ostemplate
network create --OPENSTACK --name osnetwork --description openstack-network --publicNetID <id of an OpenStack public network> --subnet 10.0.0.0/16
network select --name osnetwork
securitygroup select --name all-services-port
stack create --name my-first-stack --region local
cluster create --description "My first cluster"
```

## Next steps

Congrats! Your cluster should now be up and running. To learn more about it we have some [interesting insights](operations.md) about Cloudbreak clusters.
