
<font color='red'>
<font color='red' size='5'>March 26, 2018 <font color='red' size='5'>Known issue related to Google Cloud</font></font></br>
> Due to a recent change on Google Cloud Platform, all clusters created with Cloudbreak 1.16.5 on Google Cloud will fail. This issue will be fixed in Cloudbreak 1.16.6. If you are already using Cloudbreak 1.16.5 with Google Cloud, upgrade to Cloudbreak 1.16.6. If you were planning to install Cloudbreak 1.16.6, use Cloudbreak 1.16.6 instead. 
</font>


# Overview

Cloudbreak simplifies the provisioning, management, and monitoring of on-demand HDP clusters in virtual and cloud environments. It leverages cloud infrastructure to create host instances, and uses Apache Ambari (via Ambari Blueprints) to install and manage HDP clusters.

Using the Cloudbreak Web UI, REST API, or CLI, you can launch HDP clusters on public cloud infrastructure platforms such as **Microsoft Azure**, **Amazon Web Services (AWS)**, and **Google Cloud Platform (GCP)**, and the private cloud infrastructure platform **OpenStack**.

Cloudbreak has two main components: the **Cloudbreak Application** and the **Cloudbreak Deployer**. The **Cloudbreak Application** consists of multiple microservices (Cloudbreak, Uluwatu, Sultans, and so on). The **Cloudbreak Deployer** helps you to deploy the Cloudbreak Application automatically with Docker support. Once the Cloudbreak Application is deployed, you can use it to provision HDP clusters in various cloud environments.

> For an architectural overview of the Cloudbreak Deployer, the Cloudbreak Application, Apache Ambari, and other Cloudbreak components, see [Architecture](architecture.md).

## Installation Options

On a high level, to set up Cloudbreak and provision an HDP cluster, you need to perform the following steps:

1. **Install the Cloudbreak Deployer** using one of the two available scenarios: 
    - ([Option #1](#install-deployer)) Install the Cloudbreak Deployer on your own VM/host, or 
    - ([Option #2](#pre-built-images)) Instantiate one of the pre-built cloud images that include Cloudbreak Deployer pre-installed.
2. **Configure the Cloudbreak Deployer and install the Cloudbreak Application**.   
Once you have installed Cloudbreak Deployer (called "cbd"), the deployer will start up several Docker containers: Cloudbreak API, Cloudbreak web UI (called "Uluwatu"), Identity Server, and supporting databases. You have successfully completed this step if you are able to log in to Cloudbreak web UI in your browser.
3. **Provision an HDP Cluster** using the Cloudbreak Application.

<div id="install-deployer"></div>
### (Option #1) Installing the Cloudbreak Deployer

You can install the Cloudbreak Deployer on your own VM/host manually. 

> **[System Requirements](onprem.md#system-requirements):** 
> RHEL / CentOS / Oracle Linux 7 (64-bit), Docker 1.9.1, 4GB RAM, 10GB disk, 2 cores recommended

Once Cloudbreak Deployer is installed, use it to set up
the Cloudbreak Application. We suggest that you install the Cloudbreak Application as close to your
desired HDP clusters as possible. For example, if you plan to launch clusters on AWS, install the Cloudbreak Application on AWS.

If you choose this installation option, follow the instructions for [installing the Cloudbreak Deployer](onprem.md). Alternatively, consider using one of the [pre-built cloud images that include Cloudbreak Deployer](#pre-built-images) pre-installed.

> **IMPORTANT:** If you plan to use Cloudbreak on Azure, you must use the [Azure Setup](azure.md#deploy-using-the-azure-portal) instructions to configure the image.


<div id="pre-built-images"></div>
### (Option #2) Using the Pre-Built Cloud Images

We provide pre-built cloud images with Cloudbreak Deployer pre-installed. The following table includes
links to provider-specific instructions for configuring and launching **cbd (Cloudbreak Deployer)** and then clusters.

> **VM Requirements:** 4GB RAM, 10GB disk, 2 cores recommended

| Cloud | Cloud Image |
|---|---|
| AWS | Follow the [AWS instructions](aws.md). |
| Azure | There are no pre-built cloud images available for Azure. However, we give you an option to use Azure Resource Manager Templates instead. See the [Azure Setup](azure.md) instructions. |
| GCP | Follow the [GCP instructions](gcp.md). |
| OpenStack | Follow the [OpenStack instructions](openstack.md). |

## Learn More

For more information on Cloudbreak, Ambari and Ambari blueprints, see:

| Resource | Description |
|---|---|
|[Cloudbreak Project](http://hortonworks.com/open-source/cloudbreak/) | Visit the Hortonworks website to see Cloudbreak-related news and updates. |
|[Cloudbreak Forums](http://hortonworks.com/open-source/cloudbreak/#forums) | Visit the Cloudbreak Forums to get connected with the Cloudbreak community. |
|[Apache Ambari Project](http://hortonworks.com/hadoop/ambari/) | Learn about the Apache Ambari Project. Apache Ambari is an operational platform for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari exposes a robust set of REST APIs and a rich web interface for cluster management. |
|[Ambari Blueprints](https://cwiki.apache.org/confluence/display/AMBARI/Blueprints)| Learn about Ambari Bleuprints. Ambari Blueprints are a declarative definition of a Hadoop cluster that Ambari can use to create Hadoop clusters. |
