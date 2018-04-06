We have pre-built Cloudbreak Deployer cloud image for Google Cloud Platform (GCP). You can launch the latest Cloudbreak Deployer image at the [Google Developers Console](https://console.developers.google.com/).

> As an alternative to using the pre-built cloud images for GCP, you can install Cloudbreak Deployer on your own VM. For more information, see the [installation instructions](onprem.md).

## Prerequisites

#### Ports 

Make sure that you have opened the following ports on your [Security Group](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html):
 
* SSH (22)
* Cloudbreak (443)

## Cloudbreak Deployer GCP Image Details

## Please upgrade your Cloudbreak Deployer

Install the Cloudbreak Deployer and unzip the platform-specific single binary to your PATH. For example:

```
yum -y install unzip tar
curl -Ls s3.amazonaws.com/public-repo-1.hortonworks.com/HDP/cloudbreak/cloudbreak-deployer_1.16.6_$(uname)_x86_64.tgz | sudo tar -xz -C /bin cbd
cbd --version
```

## Import Cloudbreak Deployer Image

Import the latest Cloudbreak Deployer image on the [Google Developers Console](https://console.developers.google.com/) with the help
 of the [Google Cloud Shell](https://cloud.google.com/cloud-shell/docs/).
 
To open the Google Cloud Shell, click on the `Activate Google Cloud Shell` icon in the top right corner of the page:
 
![](/gcp/images/google-cloud-shell-button.png)
<sub>*Full size [here](/gcp/images/google-cloud-shell-button.png).*</sub>

![](/gcp/images/google-cloud-shell_v2.png)
<sub>*Full size [here](/gcp/images/google-cloud-shell_v2.png).*</sub>

Next, create your own Cloudbreak Deployer instance from the imported image on the Google Developers Console.

> Images are global resources, so you can use them across zones and projects.

## VM Requirements

When selecting an instance type, consider these minimum and recomended requirements:  

- 4GB RAM, 10GB disk, 2 cores
- The minimum instance type suitable for Cloudbreak is **n1-standard-2**

To learn about all requirements, see [System Requirements](onprem.md#system-requirements).