# Introduction

Cloudbreak simplifies the provisioning, management, and monitoring of on-demand HDP clusters in virtual and cloud environments. It leverages the cloud infrastructure platform resources to create host instances and uses Apache Ambari (via Ambari Blueprints) to install and manage the HDP cluster.

Use the Cloudbreak Web UI, REST API or CLI to launch HDP clusters on public cloud infrastructure platforms such as Microsoft Azure, Amazon Web Services (AWS), and Google Cloud Platform (GCP), and the private cloud infrastructure platform OpenStack.

Cloudbreak has two main components: the **Cloudbreak Application** and the **Cloudbreak Deployer**.

The **Cloudbreak Application** consists of multiple microservices (Cloudbreak, Uluwatu, Sultans, and so on). The **Cloudbreak Deployer** helps you to deploy the Cloudbreak application automatically with Docker support. Once the Cloudbreak Application is deployed, you can use it to provision HDP clusters in various cloud environments.

> For an architectural overview of the Cloudbreak Deployer, the Cloudbreak Application, Apache Ambari, and the rest of the Cloudbreak components, see [Architecture](architecture.md).

## Installation

On a high level, to set up Cloudbreak and install an HDP cluster, you need to perform the following steps:

1. **Install the Cloudbreak Deployer** by either [installing the Cloudbreak Deployer](#install-deployer) on your own VM/host (Install Option #1) or by instantiating one of the [pre-built cloud images that include Cloudbreak Deployer](#pre-built-images) pre-installed (Install Option #2).
2. **Configure the Cloudbreak Deployer and install the Cloudbreak Application**. Once you have installed Cloudbreak Deployer (called "cbd"), it will start up several Docker containers: Cloudbreak API, Cloudbreak Web UI (called "Uluwatu"), Identity Server, and supporting databases. You have successfully completed this step if you are able to log in to Cloudbreak Web UI in your browser.
3. **Provision an HDP Cluster** using the Cloudbreak Application.

<div id="install-deployer"></div>
### Installing the Cloudbreak Deployer (Install Option #1)

> **[Minimum and Recommended System requirements](onprem.md#minimum-and-recommended-system-requirements):** RHEL / CentOS / Oracle Linux 7 (64-bit), Docker 1.9.1, 4GB RAM, 10GB disk, 2 cores recommended

You can install the Cloudbreak Deployer on your own VM/host manually. Once installed, use the Deployer to setup
the Cloudbreak Application. We suggest that you install the Cloudbreak Application as close to the
desired HDP clusters as possible. For example, if you plan to launch clusters on AWS, install the Cloudbreak Application on AWS.

Follow the instructions for [installing the Cloudbreak Deployer](onprem.md). Alternatively, consider using one of the [pre-built cloud images that include Cloudbreak Deployer](#pre-built-images) pre-installed.

> **IMPORTANT:** If you plan to use Cloudbreak on Azure, you **must** use the [Azure Setup](azure.md#deploy-using-the-azure-portal) instructions to configure the image.


<div id="pre-built-images"></div>
### Using the Pre-Built Cloud Images (Install Option #2)

We provide pre-built cloud images with Cloudbreak Deployer pre-installed. The following table includes
links to provider-specific instructions for configuring and launching **cbd (Cloudbreak Deployer)** and then clusters.

> **Minimum and Recommended VM requirements:** 4GB RAM, 10GB disk, 2 cores recommended

| Cloud | Cloud Image |
|---|---|
| AWS | Follow the [AWS instructions](aws.md). |
| Azure | There are no pre-built cloud images available for Azure. However, we give you an option to use Azure Resource Manager Templates instead. See [Azure Setup](azure.md) to install and configure Cloudbreak Deployer. |
| GCP | Follow the [GCP instructions](gcp.md) |
| OpenStack | Follow the OpenStack instructions [OpenStack instructions](openstack.md) |

## Learn More

For more information on Cloudbreak, Ambari and Ambari Blueprints, see:

| Resource | Description |
|---|---|
|[Cloudbreak Project](http://hortonworks.com/hadoop/cloudbreak/) | Cloudbreak simplifies the provisioning of HDP clusters in virtual and cloud environments. |
|[Cloudbreak Forums](https://community.hortonworks.com/spaces/61/operations-track_2.html?topics=Cloudbreak&type=question) | Visit the Cloudbreak Forums to get connected with the Cloudbreak community. |
|[Apache Ambari Project](http://hortonworks.com/hadoop/ambari/) | Apache Ambari is an operational platform for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari exposes a robust set of REST APIs and a rich Web interface for cluster management. |
|[Ambari Blueprints](https://cwiki.apache.org/confluence/display/AMBARI/Blueprints)| Ambari Blueprints are a declarative definition of a Hadoop cluster that Ambari can use to create Hadoop clusters. |
