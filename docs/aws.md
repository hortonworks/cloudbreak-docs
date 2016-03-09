# AWS Cloud Images

We have pre-built cloud images for AWS with the Cloudbreak Deployer pre-installed. You can launch the latest 
Cloudbreak Deployer image based on your region at the [AWS Management Console](https://aws.amazon.com/console/).

> Alternatively, instead of using the pre-built cloud images for AWS, you can install Cloudbreak Deployer on your own
 VM. See [installation page](onprem.md) for more information.

Please make sure you opened the following ports on your security group:
 
 * SSH (22)
 * Cloudbreak API (8080)
 * Identity server (8089)
 * Cloudbreak GUI (3000)
 * User authentication (3001)

## Cloudbreak Deployer AWS Image Details

> **[Minimum and Recommended VM requirements](onprem.md#minimum-and-recommended-system-requirements):** 4GB RAM, 10GB disk, 2 cores

# AWS Setup

  * Default user is `ec2-user`
  * Cloudbreak Deployer location is `/var/lib/cloudbreak-deployment`.
  * All `cbd` actions must be executed from the `cbd` folder.
  * Most of the `cbd` commands require `root` permissions.

## Setup Cloudbreak Deployer

Open the `cloudbreak-deployment` directory:

```
cd /var/lib/cloudbreak-deployment`
```

This is the directory of the configuration files and the supporting binaries for Cloudbreak Deployer.

### Initialize your Profile

```
cbd init
```

It will create a `Profile` file in the current directory. Please open the `Profile` file then check the `PUBLIC_IP`. 
This is mandatory, because of to can access the Cloudbreak UI (called Uluwatu). In some cases the `cbd` tool tries to 
guess it. If `cbd` cannot get the IP address during the initialization, please add set the appropriate value.

### AWS Specific Configuration

**AWS Account Keys**

In order for Cloudbreak to be able to launch clusters on AWS on your behalf you need to set your AWS keys in the `Profile` file.
We suggest to use the keys of a valid **IAM User** here.

```
export AWS_ACCESS_KEY_ID=AKIA**************W7SA
export AWS_SECRET_ACCESS_KEY=RWCT4Cs8******************/*skiOkWD
```
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

## IAM role setup

Cloudbreak works by connecting your AWS account through so called *Credentials*, and then uses these credentials to 
create resources on your behalf.

>**IMPORTANT** Cloudbreak deployment uses two different AWS accounts for two different purposes:

- The account belonging to the *Cloudbreak webapp* itself, acts as a *third party*, that creates resources on the 
account of the *end user*. This account is configured at server-deployment time.
- The account belonging to the *end user* who uses the UI or the Shell to create clusters. This account is configured
 when setting up credentials.

These accounts are usually *the same* when the end user is the same who deployed the Cloudbreak server, but it allows
 Cloudbreak to act as a SaaS project as well if needed.

Credentials use [IAM Roles](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) to give access to the 
third party to act on behalf of the end user without giving full access to your resources.
This IAM Role will be *assumed* later by an IAM user.

**AWS IAM Policy that grants permission to assume a role**

**You cannot assume a role with root account**, so you need to **create an IAM user** with an attached [*Inline* 
policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html) and **then set the 
Access key and Secret Access key** in the 
`Profile` file (check [this description](aws.md#aws-specific-configuration) out).

The `sts-assume-role` IAM user [policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_control-access_enable-create.html) must be configured to have 
permission to assume roles on all resources. Here it is the policy to configure the `sts:AssumeRole` for all 
`Resource`:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1400068149000",
      "Effect": "Allow",
      "Action": [
        "sts:AssumeRole"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```

To connect your (*end user*) AWS account with a credential in Cloudbreak you'll have to create an IAM role on your 
AWS account that is configured to allow the third-party account to access and create resources on your behalf.
The easiest way to do this is with `cbd` commands (but it can also be done manually from the [AWS Console](https://console.aws.amazon.com)):

```
cbd aws generate-role  - Generates an AWS IAM role for Cloudbreak provisioning on AWS
cbd aws show-role      - Show assumers and policies for an AWS role
cbd aws delete-role    - Deletes an AWS IAM role, removes all inline policies
```

The `generate-role` command creates a role that is assumable by the Cloudbreak Deployer AWS account and has a broad policy setup.
This command creates a role with the name `cbreak-deployer` by default. If you'd like to create role with a different
 name or multiple roles, you need to add this line to your `Profile`:

```
export AWS_ROLE_NAME=my-cloudbreak-role
```
You can check the generated role on your AWS console, under IAM roles:
![](/images/aws-iam-role_v2.png)
<sub>*Full size [here](/images/aws-iam-role_v2.png).*</sub>

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

You can log into the Cloudbreak application at `http://<Public_IP>:3000/`.

The main goal of the Cloudbreak UI is to easily create clusters on your own cloud provider account.
This description details the AWS setup - if you'd like to use a different cloud provider check out its manual.

This document explains the four steps that need to be followed to create Cloudbreak clusters from the UI:

- connect your AWS account with Cloudbreak
- create some template resources on the UI that describe the infrastructure of your clusters
- create a blueprint that describes the HDP services in your clusters and add some recipes for customization
- launch the cluster itself based on these resources

> **IMPORTANT** Make sure that you have sufficient qouta (CPU, network, etc) for the requested cluster size.

## Setting up AWS credentials

Cloudbreak works by connecting your AWS account through so called *Credentials*, and then uses these credentials to 
create resources on your behalf. The credentials can be configured on the **manage credentials** panel on the 
Cloudbreak Dashboard.

To create a new AWS credential follow these steps:

  1. Select the credential type. For instance, select the `Role Based`
  2. Fill out the new credential `name`
    - Only alphanumeric and lowercase characters (min 5, max 100 characters) can be applied
  3. Copy your AWS IAM role's Amazon Resource Name (ARN) to the `IAM Role ARN` field
  4. Copy your SSH public key to the `SSH public key` field
    - The SSH public key must be in OpenSSH format and it's private keypair can be used later to [SSH onto every 
    instance](operations.md#ssh-to-the-hosts) of every cluster you'll create with this credential.
    - The **SSH username** for the EC2 instances is **ec2-user**.

>Any other parameter is optional here.

>`Public in account` means that all the users belonging to your account will be able to use this credential to create 
clusters, but cannot delete it.

![](/images/aws-credential_v3.png)
<sub>*Full size [here](/images/aws-credential_v3.png).*</sub>

## Infrastructure templates

After your AWS account is linked to Cloudbreak you can start creating resource templates that describe your clusters' infrastructure:

- templates
- networks
- security groups

When you create one of the above resource, **Cloudbreak does not make any requests to AWS. Resources are only created
 on AWS after the `create cluster` button has pushed.** These templates are saved to Cloudbreak's database and can be 
 reused with multiple clusters to describe the infrastructure.

**Templates**

Templates describe the **instances of your cluster** - the instance type and the attached volumes. A typical setup is
 to combine multiple templates in a cluster for the different types of nodes. For example you may want to attach multiple
 large disks to the datanodes or have memory optimized instances for Spark nodes.

The instance templates can be configured on the **manage templates** panel on the Cloudbreak Dashboard.

There are some optional configurations here as well:

- `Spot price (USD)` If specified Cloudbreak will request spot price instances (which might take a while or never be 
fulfilled by Amazon). **This option is *not supported* by the default RedHat images**.
- `EBS encryption` is supported for all volume types. If this option is checked then all the attached disks [will be encrypted](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html) by Amazon using the AWS KMS master keys.
- If `Public in account` is checked all the users belonging to your account will be able to use this resource to create clusters, but cannot delete it.

**Networks**

Your clusters can be created in their own **Virtual Private Cloud (VPC)** or in one of your already existing VPCs.
If you choose an existing VPC it is possible to create a new subnet within the VPC or use an already existing one.
The subnet's IP range must be defined in the `Subnet (CIDR)` field using the general CIDR notation.

*Default AWS Network*

If you don't want to create or use your custom VPC, you can use the `default-aws-network` for all your 
Cloudbreak clusters. It will create a new VPC with a `10.0.0.0/16` subnet every time a cluster is created.

*Custom AWS Network*

If you'd like to deploy a cluster to a custom VPC you'll have to **create a new network** template on the **manage 
networks** panel. You can configure the `Subnet Identifier` and the `Internet Gateway Identifier` (IGW) of your VPC.

>**IMPORTANT** The subnet CIDR cannot overlap each other in a VPC. So you have to create different network 
templates for every each clusters.

To create a new subnet within the VPC, provide the ID of the subnet which is in the existing VPC and your cluster 
will be launched into that subnet. **For example** you can create 3 different clusters with 3 different network 
templates for multiple subnets `10.0.0.0/24`, `10.0.1.0/24`, `10.0.2.0/24` with the same VPC and IGW identifiers.

>**IMPORTANT** Please make sure the define subnet here doesn't overlap with any of your already deployed subnet in 
the VPC, because of the validation only happens after the cluster creation starts.

>In case of existing subnet make sure you have enough room within your network space for the new instances. The 
provided subnet CIDR will be ignored, but a proper CIDR range will be used.

If `Public in account` is checked all the users belonging to your account will be able to use this network template 
to create clusters, but cannot delete it.

>**NOTE** The VPCs, IGWs and subnet are created on AWS only after the the cluster provisioning starts with the selected 
network template.

![](/images/aws-network_v3.png)
<sub>*Full size [here](/images/aws-network_v3.png).*</sub>

**Security groups**

Security group templates are very similar to the [security groups on the AWS Console](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html).
**They describe the allowed inbound traffic to the instances in the cluster.**
Currently only one security group template can be selected for a Cloudbreak cluster and all the instances have a 
public IP address so all the instances in the cluster will belong to the same security group.
This may change in a later release.

*Default Security Group*

You can also use the two pre-defined security groups in Cloudbreak.

`only-ssh-and-ssl:` all ports are locked down except for SSH and gateway HTTPS (you can't access Hadoop services outside of the VPC):

* SSH (22)
* HTTPS (443)

`all-services-port:` all Hadoop services and SSH, gateway and HTTPS are accessible by default:

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
 defined here doesn't need to contain the internal rules, those are automatically added by Cloudbreak to the security group on AWS.

>**IMPORTANT** 443 needs to be there in every security group otherwise Cloudbreak won't be able to communicate with the 
provisioned cluster.

If `Public in account` is checked all the users belonging to your account will be able to use this security group 
template to create clusters, but cannot delete it.

>**NOTE** The security groups are created on AWS only after the cluster provisioning starts with the selected security group template.

![](/images/ui-secgroup_v3.png)
<sub>*Full size [here](/images/ui-secgroup_v3.png).*</sub>

## Defining cluster services

**Blueprints**

Blueprints are your declarative definition of a Hadoop cluster. These are the same blueprints that are [used by Ambari](https://cwiki.apache.org/confluence/display/AMBARI/Blueprints).

You can use the 3 default blueprints pre-defined in Cloudbreak or you can create your own ones.
Blueprints can be added from file, URL (an [example blueprint](https://raw.githubusercontent
.com/sequenceiq/cloudbreak/master/integration-test/src/main/resources/blueprint/multi-node-hdfs-yarn.bp)) or the 
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

 - Start by selecting a previously created AWS credential in the header.

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
 - Click on the `Review and Launch` button

`Review and Launch` tab

 - After the `create and start cluster` button has clicked Cloudbreak will start to create the cluster's resources on 
 your AWS account.

Cloudbreak uses *CloudFormation* to create the resources - you can check out the resources created by Cloudbreak on 
the AWS Console CloudFormation page.
![](/images/aws-cloudformation_v2.png)
<sub>*Full size [here](/images/aws-cloudformation_v2.png).*</sub>

Besides these you can check the progress on the Cloudbreak Web UI itself if you open the new cluster's `Event History`.
![](/images/ui-eventhistory_v3.png)
<sub>*Full size [here](/images/ui-eventhistory_v3.png).*</sub>

**Advanced options**

There are some advanced features when deploying a new cluster, these are the following:

`Availability Zone` You can restrict the instances to a [specific availability zone](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html). It may be useful if you're using
 reserved instances.

`Use dedicated instances` You can use [dedicated instances](https://aws.amazon.com/ec2/purchasing-options/dedicated-instances/) on EC2

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
CloudFormation stack first. Instances are started in an Auto Scaling Group so they may be restarted if you terminate an instance manually!

Sometimes Cloudbreak cannot synchronize it's state with the cluster state at the cloud provider and the cluster can't
 be terminated. In this case the `Forced termination` option can help to terminate the cluster at the Cloudbreak 
 side. **If it has happened:**

1. You should check the related resources at the AWS CloudFormation
2. If it is needed you need to manually remove resources from there

![](/images/ui-forceterminate_v2.png)
<sub>*Full size [here](/images/ui-forceterminate_v2.png).*</sub>

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
![](/images/shell-started_v2.png)
<sub>*Full size [here](/images/shell-started_v2.png).*</sub>

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

## Setting up AWS credential

Cloudbreak works by connecting your AWS account through so called Credentials, and then uses these credentials to 
create resources on your behalf. Credentials can be configured with the following command for example:
```
credential create --AWS --name my-aws-credential --description "sample description" --roleArn 
arn:aws:iam::***********:role/userrole --sshKeyString "ssh-rsa AAAAB****etc"
```
>**NOTE** that Cloudbreak **does not set your cloud user details** - we work around the concept of [IAM](http://aws.amazon.com/iam/) - **on Amazon (or other cloud providers)**. You should have already a valid IAM role. You can 
find further details [here](aws.md#provisioning-prerequisites).

Alternatives to provide `SSH Key`:

- you can upload your public key from an url: `—sshKeyUrl` 
- or you can add the path of your public key: `—sshKeyPath`

You can check whether the credential was created successfully
```
credential list
```
You can switch between your existing credentials
```
credential select --name my-aws-credential
```

## Infrastructure templates

After your AWS account is linked to Cloudbreak you can start creating resource templates that describe your clusters' infrastructure:

- security groups
- networks
- templates

When you create one of the above resource, **Cloudbreak does not make any requests to AWS. Resources are only created
 on AWS after the `cluster create` has applied.** These templates are saved to Cloudbreak's database and can be 
 reused with multiple clusters to describe the infrastructure.

**Templates**

Templates describe the **instances of your cluster** - the instance type and the attached volumes. A typical setup is
 to combine multiple templates in a cluster for the different types of nodes. For example you may want to attach multiple
 large disks to the datanodes or have memory optimized instances for Spark nodes.

A template can be used repeatedly to create identical copies of the same stack (or to use as a foundation to start a 
new stack). Templates can be configured with the following command for example:
```
template create --AWS --name my-aws-template --description "sample description" --instanceType m4.large --volumeSize 
100 --volumeCount 2
```
You can check whether the template was created successfully
```
template list
```

**Networks**

Your clusters can be created in their own **Virtual Private Cloud (VPC)** or in one of your already existing VPCs. If 
you choose an existing VPC it is possible to create a new subnet within the VPC or use an already existing one. The 
subnet's IP range must be defined in the `Subnet (CIDR)` field using the general CIDR notation.

*Default AWS Network*

If you don't want to create or use your custom VPC, you can use the `default-aws-network` for all your Cloudbreak 
clusters. It will create a new VPC with a `10.0.0.0/16` subnet every time a cluster is created.

*Custom AWS Network*

If you'd like to deploy a cluster to a custom VPC you'll have to **create a new network** template, to create a new 
subnet within the VPC, provide the ID of the subnet which is in the existing VPC.

A network also can be used repeatedly to create identical copies of the same stack (or to use as a foundation to 
start a new stack).

>**IMPORTANT** The subnet CIDR cannot overlap each other in a VPC. So you have to create different network templates 
for every each clusters.
>For example you can create 3 different clusters with 3 different network templates for multiple subnets 10.0.0.0/24,
 10.0.1.0/24, 10.0.2.0/24 with the same VPC and IGW identifiers.

```
network create --AWS --name my-aws-network --subnet 10.0.0.0/16
```

Other available options:

`--vpcID` your existing vpc on amazon

`--internetGatewayID` your amazon internet gateway of the given VPC

`--publicInAccount` flags if the network is public in the account

You can check whether the network was created successfully
```
network list
```

**Security groups**

Security group templates are very similar to the [security groups on the AWS Console](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html). **They describe the allowed 
inbound traffic to the instances in the cluster.** Currently only one security group template can be selected for a 
Cloudbreak cluster and all the instances have a public IP address so all the instances in the cluster will belong to 
the same security group. This may change in a later release.

*Default Security Group*

You can also use the two pre-defined security groups in Cloudbreak.

`only-ssh-and-ssl:` all ports are locked down except for SSH and gateway HTTPS (you can't access Hadoop services outside of the VPC):

* SSH (22)
* HTTPS (443)

`all-services-port:` all Hadoop services and SSH, gateway and HTTPS are accessible by default:

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
 defined here doesn't need to contain the internal rules, those are automatically added by Cloudbreak to the security group on AWS.

>**IMPORTANT** 443 needs to be there in every security group otherwise Cloudbreak won't be able to communicate with the 
provisioned cluster.

```
securitygroup create --name my-security-group --description "sample description" --rules 0.0.0.0/0:tcp:443,8080,9090;10.0.33.0/24:tcp:1234,1235
```

>**NOTE** The security groups are created on AWS only after the cluster provisioning starts with the selected security group template.

You can check whether the security group was created successfully
```
securitygroup list
``` 

## Defining cluster services

**Blueprints**

Blueprints are your declarative definition of a Hadoop cluster. These are the same blueprints that are [used by Ambari](https://cwiki.apache.org/confluence/display/AMBARI/Blueprints).

You can use the 3 default blueprints pre-defined in Cloudbreak or you can create your own ones.
Blueprints can be added from file or URL (an [example blueprint](https://raw.githubusercontent.com/sequenceiq/cloudbreak/master/integration-test/src/main/resources/blueprint/multi-node-hdfs-yarn.bp)).

The host groups in the JSON will be mapped to a set of instances when starting the cluster. Besides this the services and
 components will also be installed on the corresponding nodes. Blueprints can be modified later from the Ambari UI.
 
>**NOTE** Not necessary to define all the configuration in the blueprint. If a configuration is missing, Ambari will fill that with a default value.

```
blueprint add --name my-blueprint --description "sample description" --file <the path of the blueprint>
```
Other available options:

`--url` the url of the blueprint

`--publicInAccount` flags if the network is public in the account

You can check whether the blueprint was created successfully
```
blueprint list
```

**A blueprint can be exported from a running Ambari cluster that can be reused in Cloudbreak with slight 
modifications.**
There is no automatic way to modify an exported blueprint and make it instantly usable in Cloudbreak, the 
modifications have to be done manually.
When the blueprint is exported some configurations are hardcoded for example domain names, memory configurations..etc. that won't be applicable to the Cloudbreak cluster.

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

After all the cluster resources are configured you can deploy a new HDP cluster. The following sub-sections show 
you a **basic flow for cluster creation with Cloudbreak Shell**.

**Select credential**

Select one of your previously created AWS credential:
```
credential select --name my-aws-credential
```

**Select blueprint**

Select one of your previously created blueprint which fits your needs:
```
blueprint select --name multi-node-hdfs-yarn
```

**Configure instance groups**

You must configure instance groups before provisioning. An instance group define a group of nodes with a specified 
template. Usually we create instance groups for host groups in the blueprint.

```
instancegroup configure --instanceGroup cbgateway --nodecount 1 --templateName minviable-aws
instancegroup configure --instanceGroup master --nodecount 1 --templateName minviable-aws
instancegroup configure --instanceGroup slave_1 --nodecount 1 --templateName minviable-aws
```
Other available option:

`--templateId` Id of the template

**Select network**

Select one of your previously created network which fits your needs or a default one:
```
network select --name default-aws-network
```

**Select security group**

Select one of your previously created security which fits your needs or a default one:
```
securitygroup select --name all-services-port
```
**Create stack / Create cloud infrastructure**

Stack means the running cloud infrastructure that is created based on the instance groups configured earlier 
(`credential`, `instancegroups`, `network`, `securitygroup`). Same as in case of the API or UI the new cluster will 
use your templates and by using CloudFormation will launch your cloud stack. Use the following command to create a 
stack to be used with your Hadoop cluster:
```
stack create --name myawsstack --region us-east-1
```
The infrastructure is created asynchronously, the state of the stack can be checked with the stack `show command`. If 
it reports AVAILABLE, it means that the virtual machines and the corresponding infrastructure is running at the cloud provider.

Other available option is `--wait` - in this case the create command will return only after the process has finished. 

**Create a Hadoop cluster / Cloud provisioning**

**You are almost done! One more command and your Hadoop cluster is starting!** Cloud provisioning is done once the 
cluster is up and running. The new cluster will use your selected blueprint and install your custom Hadoop cluster 
with the selected components and services.

```
cluster create --description "my first cluster"
```
You can use the `--wait` parameter here as well. 

**You are done!** You have several opportunities to check the progress during the infrastructure creation then 
provisioning:

- Cloudbreak uses *CloudFormation* to create the resources - you can check out the resources created by Cloudbreak on
 the AWS Console CloudFormation page.

For example:
![](/images/aws-cloudformation_v2.png)
<sub>*Full size [here](/images/aws-cloudformation_v2.png).*</sub>

- If stack then cluster creation have successfully done, you can check the Ambari Web UI. However you need to know the 
Ambari IP (for example: `http://52.8.110.95:8080`): 
    - You can get the IP from the CLI as a result (`ambariServerIp 52.8.110.95`) of the following command:
```
         cluster show
```

For example:
![](/images/ambari-dashboard.png)
<sub>*Full size [here](/images/ambari-dashboard.png).*</sub>

- Besides these you can check the entire progress and the Ambari IP as well on the Cloudbreak Web UI itself. Open the 
new cluster's `details` and its `Event History` here.

For example:
![](/images/ui-eventhistory_v3.png)
<sub>*Full size [here](/images/ui-eventhistory_v3.png).*</sub>

**Stop cluster**

You have the ability to **stop your existing stack then its cluster** if you want to suspend the work on it.

Select a stack for example with its name:
```
stack select --name my-stack
```
Other available option to define a stack is its `--id`.

Every time you should stop the `cluster` first then the `stack`. So apply following commands to stop the previously 
selected stack:
```
cluster stop
stack stop
```

**Restart cluster**

**Select your stack that you would like to restart** after this you can apply:
```
stack start
```
After the stack has successfully restarted, you can **restart the related cluster as well**:
```
cluster start
```

**Upscale cluster**

If you need more instances to your infrastructure, you can **upscale your selected stack**:
```
stack node --ADD --instanceGroup host_group_slave_1 --adjustment 6
```
Other available option is `--withClusterUpScale` - this indicates also a cluster upscale after the stack upscale. You
 can upscale the related cluster separately if you want to do this:
```
cluster node --ADD --hostgroup host_group_slave_1 --adjustment 6
```
**Downscale cluster**

You also can reduce the number of instances in your infrastructure. **After you selected your stack**:
```
cluster node --REMOVE  --hostgroup host_group_slave_1 --adjustment -2
```
Other available option is `--withStackDownScale` - this indicates also a stack downscale after the cluster downscale.
 You can downscale the related stack separately if you want to do this:
```
stack node --REMOVE  --instanceGroup host_group_slave_1 --adjustment -2
```

## Cluster termination

You can terminate running or stopped clusters with
```
stack terminate --name myawsstack
```

>**IMPORTANT** Always use Cloudbreak to terminate the cluster. If that fails for some reason, try to delete the 
CloudFormation stack first. Instances are started in an Auto Scaling Group so they may be restarted if you terminate an instance manually!

Sometimes Cloudbreak cannot synchronize it's state with the cluster state at the cloud provider and the cluster can't
 be terminated. In this case the `Forced termination` option on the Cloudbreak Web UI can help to terminate the cluster
  at the Cloudbreak side. **If it has happened:**

1. You should check the related resources at the AWS CloudFormation
2. If it is needed you need to manually remove resources from there

## Silent mode

With Cloudbreak Shell you can execute script files as well. A script file contains shell commands and can 
be executed with the `script` cloudbreak shell command

```
script <your script file>
```

or with the `cbd util cloudbreak-shell-quiet` command

```
cbd util cloudbreak-shell-quiet < example.sh
```

>**IMPORTANT** You have to copy all your files into the `cbd` working directory, what you would like to use in shell.
 For example if your `cbd` working directory is ~/cloudbreak-deployment then copy your script file to here.

### Example

The following example creates a Hadoop cluster with `hdp-small-default` blueprint on M4Xlarge instances with 2X100G 
attached disks on `default-aws-network` network using `all-services-port` security group. You should copy your ssh 
public key file into your `cbd` working directory with name `id_rsa.pub` and paste your AWS credentials in the parts with `<...>` highlight.

```
credential create --AWS --description description --name my-aws-credential --roleArn <arn role> --sshKeyPath id_rsa.pub
credential select --name my-aws-credential
template create --AWS --name awstemplate --description aws-template --instanceType m4.xlarge --volumeSize 100 
--volumeCount 2
blueprint select --name hdp-small-default
instancegroup configure --instanceGroup cbgateway --nodecount 1 --templateName awstemplate
instancegroup configure --instanceGroup host_group_master_1 --nodecount 1 --templateName awstemplate
instancegroup configure --instanceGroup host_group_master_2 --nodecount 1 --templateName awstemplate
instancegroup configure --instanceGroup host_group_master_3 --nodecount 1 --templateName awstemplate
instancegroup configure --instanceGroup host_group_client_1  --nodecount 1 --templateName awstemplate
instancegroup configure --instanceGroup host_group_slave_1 --nodecount 3 --templateName awstemplate
network select --name default-aws-network
securitygroup select --name all-services-port
stack create --name my-first-stack --region us-east-1
cluster create --description "My first cluster"
```

**Congratulations!** Your cluster should now be up and running on this way as well. To learn more about Cloudbreak and 
provisioning, we have some [interesting insights](operations.md) for you.

