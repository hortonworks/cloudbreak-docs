# Google Cloud Images

We have pre-built Cloudbreak Deployer cloud image for Google Cloud Platform (GCP). You can launch the latest 
Cloudbreak Deployer image at the [Google Developers Console](https://console.developers.google.com/).

> Alternatively, instead of using the pre-built cloud images for GCP, you can install Cloudbreak Deployer on your own
 VM. See [installation page](onprem.md) for more information.

Please make sure you added the following ports to your firewall rules:
 
 * SSH (22)
 * Cloudbreak API (8080)
 * Identity server (8089)
 * Cloudbreak GUI (3000)
 * User authentication (3001)

## Cloudbreak Deployer GCP Image Details


### Import Cloudbreak Deployer Image

You can import the latest Cloudbreak Deployer image on the [Google Developers Console](https://console.developers.google.com/) with the help
 of the [Google Cloud Shell](https://cloud.google.com/cloud-shell/docs/).
 
Just click on the `Activate Google Cloud Shell` icon in the top right corner of the page:
 
![](/images/google-cloud-shell-button.png)
<sub>*Full size [here](/images/google-cloud-shell-button.png).*</sub>

**Images are global resources, so you can use these across zones and projects.**
![](/images/google-cloud-shell_v2.png)
<sub>*Full size [here](/images/google-cloud-shell_v2.png).*</sub>

You can **create your own Cloudbreak Deployer (cbd) instance from the imported image** on the Google Developers Console.

> **[Minimum and Recommended VM requirements](onprem.md#minimum-and-recommended-system-requirements):** 4GB RAM, 10GB disk, 2 cores

# Google Setup

  * Default user is cloudbreak
  * Cloudbreak Deployer location is `/var/lib/cloudbreak-deployment`.
  * All `cbd` actions must be executed from the `cbd` folder.
  * Most of the `cbd` commands require `root` permissions.

## Setup Cloudbreak Deployer

You should already have the Cloudbreak Deployer either by [using the GCP Cloud Images](gcp.md) or by [installing the 
Cloudbreak Deployer](onprem.md) manually on your own VM. If you have your own installed VM with 

You have several opportunities to [connect to the previously created `cbd` VM](https://cloud.google.com/compute/docs/instances/connecting-to-instance).

  * Cloudbreak Deployer location is `/home/centos/cloudbreak-deployment/`.
  * All `cbd` actions must be executed from the `cbd` folder.
  * Most of the `cbd` commands require `root` permissions. So `sudo su` here would be worth for you. 

Open the `cloudbreak-deployment` directory:

```
cd cloudbreak-deployment
```

This is the directory of the config files and the supporting binaries that will be downloaded by Cloudbreak Deployer.

### Initialize your Profile

First initialize `cbd` by creating a `Profile` file:

```
cbd init
```
It will create a `Profile` file in the current directory. Please open the `Profile` file then check the `PUBLIC_IP`. 
This is mandatory, because of to can access the Cloudbreak UI (called Uluwatu). In some cases the `cbd` tool tries to 
guess it. If `cbd` cannot get the IP address during the initialization, please add set the appropriate value.

## Start Cloudbreak Deployer

To start the Cloudbreak application use the following command.
This will start all the Docker containers and initialize the application.

```
cbd start
```

>At the very first time it will take for a while, because of need to download all the necessary docker images.

The `cbd start` command includes the `cbd generate` command which applies the following steps:

- creates the **docker-compose.yml** file that describes the configuration of all the Docker containers needed for the Cloudbreak deployment.
- creates the **uaa.yml** file that holds the configuration of the identity server used to authenticate users to Cloudbreak.

## Validate the started Cloudbreak Deployer

After the `cbd start` command finishes followings are worthy to check:
- Pre-installed Cloudbreak Deployer version and health.
```
   cbd doctor
```
>In case of `cbd update` is needed, please check the related documentation for [Cloudbreak Deployer Update](operations.md#cloudbreak-deployer-update). Most of the `cbd` commands require `root` permissions.

- Started Cloudbreak Application logs.
```
   cbd logs cloudbreak
```
>Cloudbreak should start within a minute - you should see a line like this: `Started CloudbreakApplication in 36.823 seconds`

# Provisioning Prerequisites

## Creating a Google Cloud Service Account

Follow the [instructions](https://cloud.google.com/storage/docs/authentication#service_accounts) in Google Cloud's documentation to create a `Service account` and `Generate a new P12 key`.

Make sure that at API level (**APIs and auth** menu) you have enabled:

* Google Compute Engine
* Google Compute Engine Instance Group Manager API
* Google Compute Engine Instance Groups API
* BigQuery API
* Google Cloud Deployment Manager API
* Google Cloud DNS API
* Google Cloud SQL
* Google Cloud Storage
* Google Cloud Storage JSON API

>If you have enabled every API then you have to wait about **10 minutes** for the provider.

When creating GCP credentials **in Cloudbreak you will have to provide the email address of your `Service Account` 
(from the Service accounts page of your Google Cloud Platform Permissions) and the `Project ID` (from the Dashboard 
of your Google Cloud Platform Home) where the service account is created.** You'll also have to **upload the 
generated P12 file and provide an OpenSSH formatted public key** that will be used as an SSH key.

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

# Provisioning via Browser

You can log into the Cloudbreak application at `http://<PUBLIC_IP>:3000`.

The main goal of the Cloudbreak UI is to easily create clusters on your own cloud provider account.
This description details the GCP setup - if you'd like to use a different cloud provider check out its manual.

This document explains the four steps that need to be followed to create Cloudbreak clusters from the UI:

- connect your GCP account with Cloudbreak
- create some template resources on the UI that describe the infrastructure of your clusters
- create a blueprint that describes the HDP services in your clusters and add some recipes for customization
- launch the cluster itself based on these template resources

>**IMPORTANT** Make sure that you have sufficient qouta (CPU, network, etc) for the requested cluster size.

## Setting up GCP credentials

Cloudbreak works by connecting your GCP account through so called *Credentials*, and then uses these credentials to 
create resources on your behalf. The credentials can be configured on the **manage credentials** panel on the 
Cloudbreak Dashboard.

To create a new GCP credential follow these steps:

  1. Fill out the new credential `name`
    - Only alphanumeric and lowercase characters (min 5, max 100 characters) can be applied
  2. Copy your GCP project ID to the `Project Id` field
  3. Copy your GCP Service Account email address to the `Service Account Email Address` field
  4. Upload your GCP Service Account private key (generated `p12 Key`) to the `Service Account Private (p12) Key` field
  5. Copy your SSH public key to the `SSH public key` field
    - The SSH public key must be in OpenSSH format and it's private keypair can be used later to [SSH onto every instance](operations.md#ssh-to-the-hosts) of every cluster you'll create with this credential.
    - The **SSH username** for the EC2 instances is **cloudbreak**.

>Any other parameter is optional here.

>`Public in account` means that all the users belonging to your account will be able to use this credential to create 
clusters, but cannot delete it.

![](/images/gcp-credential.png)
<sub>*Full size [here](/images/gcp-credential.png).*</sub>

## Infrastructure templates

After your GCP account is linked to Cloudbreak you can start creating resource templates that describe your clusters' 
infrastructure:

- templates
- networks
- security groups

When you create one of the above resource, **Cloudbreak does not make any requests to GCP. Resources are only created 
on GCP after the `create cluster` button has pushed.** These templates are saved to Cloudbreak's database and can be 
reused with multiple clusters to describe the infrastructure.

**Templates**

Templates describe the **instances of your cluster** - the instance type and the attached volumes. A typical setup is
 to combine multiple templates in a cluster for the different types of nodes. For example you may want to attach multiple
 large disks to the datanodes or have memory optimized instances for Spark nodes.

The instance templates can be configured on the **manage templates** panel on the Cloudbreak Dashboard.

If `Public in account` is checked all the users belonging to your account will be able to use this resource to create clusters, but cannot delete it.

**Networks**

Your clusters can be created in their own **networks** or in one of your already existing one. If you choose an 
existing network, it is possible to create a new subnet within the network. The subnet's IP range must be defined in 
the `Subnet (CIDR)` field using the general CIDR notation. You can read more about [GCP Networks](https://cloud.google.com/compute/docs/networking#networks) and [Subnet 
networks](https://cloud.google.com/compute/docs/networking#subnet_network).

*Default GCP Network*

If you don't want to create or use your custom network, you can use the `default-gcp-network` for all your 
Cloudbreak clusters. It will create a new network with a `10.0.0.0/16` subnet every time a cluster is created.

*Custom GCP Network*

If you'd like to deploy a cluster to a custom network you'll have to **create a new network** template on the **manage 
networks** panel. You can define the `Virtual Network Identifier` of your network.

`Virtual Network Identifier` is an optional value. This must be an ID of an existing GCP virtual network. If the 
identifier is provided, the subnet CIDR will be ignored and the existing network's CIDR range will be used.

>**IMPORTANT** Please make sure the defined subnet here doesn't overlap with any of your already deployed subnet in the
 network, because of the validation only happens after the cluster creation starts.

>In case of existing subnet make sure you have enough room within your network space for the new instances. The 
provided subnet CIDR will be ignored, but a proper CIDR range will be used.

If `Public in account` is checked all the users belonging to your account will be able to use this network template 
to create clusters, but cannot delete it.

>**NOTE** The new networks are created on GCP only after the the cluster provisioning starts with the selected 
network template.

![](/images/gcp-network.png)
<sub>*Full size [here](/images/gcp-network.png).*</sub>

**Security groups**

Security group templates are very similar to the [Firewalls on GCP](https://cloud.google
.com/compute/docs/networks-and-firewalls#firewalls). **They describe the allowed inbound traffic 
to the instances in the cluster.** Currently only one security group template can be selected for a Cloudbreak cluster 
and all the instances have a public IP address so all the instances in the cluster will belong to the same security 
group. This may change in a later release.

*Default Security Group*

You can also use the two pre-defined security groups in Cloudbreak.

`only-ssh-and-ssl:` all ports are locked down except for SSH and gateway HTTPS (you can't access Hadoop services 
outside of the virtual network):

* SSH (22)
* HTTPS (443)

`all-services-port:` all Hadoop services and SSH, gateway HTTPS are accessible by default:

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

*Custom Security Group*

You can define your own security group by adding all the ports, protocols and CIDR range you'd like to use. The rules
 defined here doesn't need to contain the internal rules, those are automatically added by Cloudbreak to the security
  group on GCP.

>**IMPORTANT** 443 needs to be there in every security group otherwise Cloudbreak won't be able to communicate with the 
provisioned cluster.

If `Public in account` is checked all the users belonging to your account will be able to use this security group 
template to create clusters, but cannot delete it.

>**NOTE** The security groups are created on GCP only after the cluster provisioning starts with the selected 
security group template.

![](/images/ui-secgroup_v3.png)
<sub>*Full size [here](/images/ui-secgroup_v3.png).*</sub>

## Defining cluster services

**Blueprints**

Blueprints are your declarative definition of a Hadoop cluster. These are the same blueprints that are [used by Ambari](https://cwiki.apache.org/confluence/display/AMBARI/Blueprints).

You can use the 3 default blueprints pre-defined in Cloudbreak or you can create your own ones.
Blueprints can be added from file, URL (an [example blueprint](https://raw.githubusercontent.com/sequenceiq/cloudbreak/master/integration-test/src/main/resources/blueprint/multi-node-hdfs-yarn.bp)) or the 
whole JSON can be written in the `JSON text` box.

The host groups in the JSON will be mapped to a set of instances when starting the cluster. Besides this the services and
 components will also be installed on the corresponding nodes. Blueprints can be modified later from the Ambari UI.
 
>**NOTE** Not necessary to define all the configuration in the blueprint. If a configuration is missing, Ambari will 
fill that with a default value.

If `Public in account` is checked all the users belonging to your account will be able to use this blueprint to 
create clusters, but cannot delete or modify it.

![](/images/ui-blueprints_v3.png)
<sub>*Full size [here](/images/ui-blueprints_v3.png).*</sub>

**A blueprint can be exported from a running Ambari cluster that can be reused in Cloudbreak with slight 
modifications.**
There is no automatic way to modify an exported blueprint and make it instantly usable in Cloudbreak, the 
modifications have to be done manually.
When the blueprint is exported some configurations are hardcoded for example domain names, memory configurations...etc. that won't be applicable to the Cloudbreak cluster.

**Cluster customization**

Sometimes it can be useful to **define some custom scripts so called Recipes in Cloudbreak** that run during cluster 
creation and add some additional functionality.

For example it can be a service you'd like to install but it's not supported by Ambari or some script that 
automatically downloads some data to the necessary nodes.
The most **notable example is Ranger setup**:

- It has a prerequisite of a running database when Ranger Admin is installing.
- A PostgreSQL database can be easily started and configured with a recipe before the blueprint installation starts.

To learn more about these and check the Ranger recipe out, take a look at the [Cluster customization](recipes.md).

## Cluster deployment

After all the cluster resources are configured you can deploy a new HDP cluster.

Here is a **basic flow for cluster creation on Cloudbreak Web UI**:

 - Start by selecting a previously created GCP credential in the header.

![](/images/ui-credentials_v2.png)
<sub>*Full size [here](/images/ui-credentials_v2.png).*</sub>

 - Open `create cluster`

`Configure Cluster` tab

 - Fill out the new cluster `name`
    - Cluster name must start with a lowercase alphabetic character then you can apply lowercase alphanumeric and 
   hyphens only (min 5, max 40 characters)
 - Select a `Region` where you like your cluster be provisioned
 - Click on the `Setup Network and Security` button
>If `Public in account` is checked all the users belonging to your account will be able to see the created cluster on
 the UI, but cannot delete or modify it.

`Setup Network and Security` tab

 - Select one of the networks
 - Select one of the security groups
 - Click on the `Choose Blueprint` button
>If `Enable security` is checked as well, Cloudbreak will install Key Distribution Center (KDC) and the cluster will 
be Kerberized. See more about it in the [Kerberos](kerberos.md) section of this documentation.

`Choose Blueprint` tab

 - Select one of the blueprint
 - After you've selected a `Blueprint`, you should be able to configure:
    - the templates
    - the number of nodes for all of the host groups in the blueprint
    - the recipes for nodes
 - Click on the `Add File System` button

`Add File System` tab

 - Select one of the file system that fits your needs
 - After you've selected `GCS file system`, you should configure:
    - `Default Bucket Name`
 - Click on the `Review and Launch` button
>You can read more about [GCS File System](https://cloud.google.com/storage/docs/gcs-fuse) and [Bucket Naming](https://cloud.google.com/storage/docs/naming#requirements) in GCP 
Documentation.

`Review and Launch` tab

 - After the `create and start cluster` button has clicked Cloudbreak will start to create the cluster's resources on 
 your GCP account.

Cloudbreak uses *Google Cloud Platform* to create the resources - you can check out the resources created by Cloudbreak
 on the `Compute Engine` page of the `Google Compute Platform`.
![](/images/gcp-computeengine.png)
<sub>*Full size [here](/images/gcp-computeengine.png).*</sub>

Besides these you can check the progress on the Cloudbreak Web UI itself if you open the new cluster's `Event History`.
![](/images/gcp-eventhistory.png)
<sub>*Full size [here](/images/gcp-eventhistory.png).*</sub>

**Advanced options**

There are some advanced features when deploying a new cluster, these are the following:

`Availability Zone` You can restrict the instances to a [specific availability zone](https://cloud.google.com/compute/docs/zones). It may be useful if you're using
 reserved instances.

`Minimum cluster size` The provisioning strategy in case of the cloud provider cannot allocate all the requested nodes.

`Validate blueprint` This is selected by default. Cloudbreak validates the Ambari blueprint in this case.

`Config recommendation strategy` Strategy for configuration recommendations how will be applied. Recommended 
configurations gathered by the response of the stack advisor. 

* `NEVER_APPLY`               Configuration recommendations are ignored with this option.
* `ONLY_STACK_DEFAULTS_APPLY` Applies only on the default configurations for all included services.
* `ALWAYS_APPLY`              Applies on all configuration properties.

`Start LDAP and configure SSSD` Enables the [System Security Services Daemon](sssd.md) configuration.

## Cluster termination

You can terminate running or stopped clusters with the `terminate` button in the cluster details.

>**IMPORTANT** Always use Cloudbreak to terminate the cluster. If that fails for some reason, try to delete the 
GCP instances first. Instances are started in an Auto Scaling Group so they may be restarted if you terminate an 
instance manually!

Sometimes Cloudbreak cannot synchronize it's state with the cluster state at the cloud provider and the cluster can't
 be terminated. In this case the `Forced termination` option can help to terminate the cluster at the Cloudbreak 
 side. **If it has happened:**

1. You should check the related resources at the Google Cloud Platform
2. If it is needed you need to manually remove resources from there

![](/images/gcp-forceterminate.png)
<sub>*Full size [here](/images/gcp-forceterminate.png).*</sub>

# Interactive mode / Cloudbreak Shell

The goal with the Cloudbreak Shell (Cloudbreak CLI) was to provide an interactive command line tool which supports:

- all functionality available through the REST API or Cloudbreak Web UI
- makes possible complete automation of management task via scripts
- context aware command availability
- tab completion
- required/optional parameter support
- hint command to guide you on the usual path

## Start Cloudbreak Shell

To start the Cloudbreak CLI use the following commands:

 - Open your `cloudbreak-deployment` directory if it is needed. For example:
```
   cd cloudbreak-deployment
```
>If you use deployed Cloudbreak VM from GCP Image, the path is `/home/centos/cloudbreak-deployment/`.

 - Start the `cbd` from here if it is needed
```
   cbd start
```
 - In the root of your `cloudbreak-deployment` folder apply:
```
   cbd util cloudbreak-shell
```
>At the very first time it will take for a while, because of need to download all the necessary docker images.

This will launch the Cloudbreak shell inside a Docker container then it is ready to use.
![](/images/gcp-cbdshell-started.png)
<sub>*Full size [here](/images/gcp-cbdshell-started.png).*</sub>

>**IMPORTANT You have to copy all your files into the `cbd` working directory, what you would like to use in shell.** For 
example if your `cbd` working directory is `~/cloudbreak-deployment` then copy your **blueprint JSON, public ssh key 
file...etc.** to here. You can refer to these files with their names from the shell.

## Autocomplete and hints

Cloudbreak Shell helps to you with **hint messages** from the very beginning, for example:
```
cloudbreak-shell>hint
Hint: Add a blueprint with the 'blueprint add' command or select an existing one with 'blueprint select'
cloudbreak-shell>
```
Beyond this you can use the **autocompletion (double-TAB)** as well:
```
cloudbreak-shell>credential create --
credential create --AWS          credential create --AZURE        credential create --EC2          credential create --GCP          credential create --OPENSTACK
```
# Provisioning via CLI

## Setting up GCP credential

Cloudbreak works by connecting your GCP account through so called Credentials, and then uses these credentials to 
create resources on your behalf. Credentials can be configured with the following command for example:
```
credential create --GCP --description "sample description" --name my-gcp-credential --projectId <your gcp projectid> 
--serviceAccountId <your GCP service account mail address> --serviceAccountPrivateKeyPath /files/mykey.p12 
--sshKeyString "ssh-rsa AAAAB3***etc."
```
>**NOTE** that Cloudbreak **does not set your cloud user details** - we work around the concept of GCP Service 
Account Credentials. You should have already a valid GCP service account. You can find further details [here](gcp.md#provisioning-prerequisites).

Alternatives to provide `SSH Key`:

- you can upload your public key from an url: `—sshKeyUrl` 
- or you can add the path of your public key: `—sshKeyPath`

You can check whether the credential was created successfully
```
credential list
```
You can switch between your existing credentials
```
credential select --name my-gcp-credential
```
## Infrastructure templates

After your GCP account is linked to Cloudbreak you can start creating resource templates that describe your clusters' 
infrastructure:

- security groups
- networks
- templates

When you create one of the above resource, **Cloudbreak does not make any requests to GCP. Resources are only created
 on GCP after the `cluster create` has applied.** These templates are saved to Cloudbreak's database and can be 
 reused with multiple clusters to describe the infrastructure.

**Templates**

A template gives developers and systems administrators an easy way to create and manage a collection of cloud infrastructure related resources, maintaining and updating them in an orderly and predictable fashion. A template can be used repeatedly to create identical copies of the same stack (or to use as a foundation to start a new stack).

```
template create --GCP --name gcptemplate --description gcp-template --instanceType N1_STANDARD_4 --volumeSize 100 --volumeCount 2
```
Other available options:

`--volumeType` defaults to "HDD", other allowed value: "SSD"

`--publicInAccount` flags if the template is public in the account

You can check whether the template was created successfully by using the `template list` or `template show` command.

You can delete your cloud template - when you’d like to delete one you will have to use:
```
template delete --name gcptemplate
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
network create --GCP --name gcpnetwork --description "gcp network"--subnet 10.0.0.0/16
```

Other available options:

`--publicInAccount` flags if the network is public in the account

There is a default network with name `default-gcp-network`. If we use this for cluster creation, Cloudbreak will create the cluster within the 10.0.0.0/16 subnet.

You can check whether the network was created successfully by using the `network list` command. Check the network and select it if you are happy with it:

```
network show --name gcpnetwork

network select --name gcpnetwork
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

`only-ssh-and-ssl:` all ports are locked down (you can't access Hadoop services outside of the VPC)

* SSH (22)
* HTTPS (443)

`all-services-port:` all Hadoop services + SSH/HTTP are accessible by default:

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
instancegroup configure --instanceGroup host_group_slave_1 --nodecount 3 --templateName minviable-gcp
```

Other available options:

`--templateId` Id of the template

### Create a Hadoop cluster
You are almost done - two more command and this will create your Hadoop cluster on your favorite cloud provider. Same as the API, or UI this will use your `credential`, `instancegroups`, `network`, `securitygroup`, and by using Google Cloud Platform will launch a cloud stack
```
stack create --name my-first-stack --region US_CENTRAL1_A
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
>**IMPORTANT** The related cluster should be stopped before you can stop the stack.


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

or with the `cbd util cloudbreak-shell-quiet` `cbd` command:

```
cbd util cloudbreak-shell-quiet < example.sh
```

## Example

The following example creates a hadoop cluster with `hdp-small-default` blueprint on M3Xlarge instances with 2X100G attached disks on `default-gcp-network` network using `all-services-port` security group. You should copy your ssh public key file and your GCP service account generated private key into your `cbd` working directory with name `id_rsa.pub` and `gcp.p12` and change the `<...>` parts with your gcp credential details.

```
credential create --GCP --description "my credential" --name my-gcp-credential --projectId <your gcp projectid> --serviceAccountId <your GCP service account mail address> --serviceAccountPrivateKeyPath gcp.p12 --sshKeyFile id_rsa.pub
credential select --name my-gcp-credential
template create --GCP --name gcptemplate --description gcp-template --instanceType N1_STANDARD_4 --volumeSize 100 --volumeCount 2
blueprint select --name hdp-small-default
instancegroup configure --instanceGroup cbgateway --nodecount 1 --templateName gcptemplate
instancegroup configure --instanceGroup host_group_master_1 --nodecount 1 --templateName gcptemplate
instancegroup configure --instanceGroup host_group_master_2 --nodecount 1 --templateName gcptemplate
instancegroup configure --instanceGroup host_group_master_3 --nodecount 1 --templateName gcptemplate
instancegroup configure --instanceGroup host_group_client_1  --nodecount 1 --templateName gcptemplate
instancegroup configure --instanceGroup host_group_slave_1 --nodecount 3 --templateName gcptemplate
network select --name default-gcp-network
securitygroup select --name all-services-port
stack create --name my-first-stack --region US_CENTRAL1_A
cluster create --description "My first cluster"
```

Congrats! Your cluster should now be up and running. To learn more about it we have some [interesting insights](operations.md) about Cloudbreak clusters.

