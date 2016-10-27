# Architecture

##Cloudbreak Deployer Architecture

Cloudbreak Deployer includes the following components:  
- **UAA**: OAuth identity server implementation  
- **Cloudbreak**: the Cloudbreak application  
- **Periscope**: the Periscope application  
- **Uluwatu**: Cloudbreak web UI  
- **Sultans**: Cloudbreak user management

### System Level Containers

Cloudbreak Deployer includes the following system-level containers:  
- **Consul**: Cloudbreak service registry  
- **Registrator**: automatically registers/unregisters containers with consul  

##Cloudbreak Application Architecture

Cloudbreak is built on the foundation of cloud provider APIs and Apache Ambari.

###Apache Ambari

The goal of the Apache Ambari project is to simplify Hadoop management by developing software for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari provides an intuitive, easy-to-use Hadoop management web UI backed by its RESTful APIs.

![](https://raw.githubusercontent.com/sequenceiq/cloudbreak-docs/master/docs/diagrams/ambari-overview.png)

Ambari enables System Administrators to: 

  1. **Provision a Hadoop Cluster**:  
     * Ambari provides a step-by-step wizard for installing Hadoop services across any number of hosts.
     * Ambari handles configuration of Hadoop services for the cluster.
  2. **Manage a Hadoop Cluster**:  
     * Ambari provides central management for starting, stopping, and reconfiguring Hadoop services across the entire.
   cluster.
  3. **Monitor a Hadoop Cluster**:  
     * Ambari provides a dashboard for monitoring health and status of the Hadoop cluster.
     * Ambari lets you set predefined alerts or add custom alerts.

####Ambari Blueprints
Ambari blueprints are a declarative definition of a cluster. With a blueprint, you can specify stack, component
 layout, and configurations to materialise a Hadoop cluster instance (via a REST API) without having to use the Ambari
  Cluster Install Wizard.

![](https://raw.githubusercontent.com/sequenceiq/cloudbreak/master/docs/images/ambari-create-cluster.png)

####Salt
Salt manages complex systems at scale. Salt can be used for data-driven orchestration, remote execution for any infrastructure, configuration management for any app stack, and much more.
