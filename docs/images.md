# Custom Images

> Custom Images support is part of `TECHNICAL PREVIEW` and is not suitable for production use.

Cloudbreak includes **Standard** images by default for each cloud platform. These default images are declared in `yml` files
in Cloudbreak, which Cloudbreak loads upon start.

| Cloud Provider | Standard Image OS |
|---|---|
|AWS | Amazon Linux 2017.03 |
|Azure | CentOS 7 |
|Google Cloud Platform | CentOS 7 |
|OpenStack | CentOS 7 |

In some cases, your OS setup and configuration requirements necessitate changes to the image used by Cloudbreak.
The process to bring your own image is referred to as using a *Custom Image*. If you wish to
use a *Custom Image* instead of the default **Standard** images used by Cloudbreak, you can **build** and **register** your custom image(s) for use
in Cloudbreak. This section describes that process.

## Building Custom Images

To build a custom image, Cloudbreak includes instructions and a set of scripts that leverage [Packer](https://www.packer.io/docs/).
Those instructions and scripts can be found in this [GitHub repository](https://github.com/hortonworks/cloudbreak-images):

```
https://github.com/hortonworks/cloudbreak-images
```

Following the instructions in this repository to build your custom images. Once complete, you are ready to register your
image in Cloudbreak for use. 

## Registering Custom Images

Register your custom image(s) in Cloudbreak by placing `yml` files that
declare your custom images in the `/var/lib/cloudbreak-deployment/etc` directory on the Cloudbreak host. The
`etc` directory does not exist by default so you need to create it.

The format of the `yml` files is cloud provider specific and described in the following sections.  

> Important: If you register images after Cloudbreak has been started, you need to restart the application after updating the images.

### AWS

To override the default images, create the following file: `/var/lib/cloudbreak-deployment/etc/aws-images.yml` and
replace its content by updating **to your custom image** for each region as desired. The default content of the `yml` file is:

```
aws:
  ap-northeast-1: ami-76729917
  ap-northeast-2: ami-7c1ad112
  ap-southeast-1: ami-a7ac7fc4
  ap-southeast-2: ami-acf7decf
  eu-central-1: ami-71da331e
  eu-west-1: ami-cba43bb8
  sa-east-1: ami-f8901a94
  us-east-1: ami-48ba9d5e
  us-west-1: ami-b76421d7
  us-west-2: ami-d541bbb5
```

### Azure
To override the default images, create the following file: `/var/lib/cloudbreak-deployment/etc/arm-images.yml` and
replace its content by updating **to your custom image** for each region as desired. The default content of the `yml` file is:

```
azure_rm:
  East Asia: https://sequenceiqeastasia2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  East US: https://sequenceiqeastus2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  Central US: https://sequenceiqcentralus2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  North Europe: https://sequenceiqnortheurope2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  South Central US: https://sequenceiqouthcentralus2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  North Central US: https://sequenceiqorthcentralus2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  East US 2: https://sequenceiqeastus22.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  Japan East: https://sequenceiqjapaneast2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  Japan West: https://sequenceiqjapanwest2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  Southeast Asia: https://sequenceiqsoutheastasia2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  West US: https://sequenceiqwestus2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  West Europe: https://sequenceiqwesteurope2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
  Brazil South: https://sequenceiqbrazilsouth2.blob.core.windows.net/images/cb-2016-06-14-03-27.vhd
```

### GCP
To override the default images, create the following file: `/var/lib/cloudbreak-deployment/etc/gcp-images.yml` and
replace its content by updating **to your custom image** for each region as desired. It is not required to have an image in every region, as the `default` is used everywhere. The default content of the `yml` file is:

```
gcp:
  default: sequenceiqimage/cb-2016-06-14-03-27.tar.gz
```

### OpenStack
To override the default images, create the following file: `/var/lib/cloudbreak-deployment/etc/os-images.yml` and
replace its content by updating **to your custom image** for each region as desired. It is not required to have an image in every region, as the `default` is used everywhere. The default content of the `yml` file is:

```
openstack:
  default: cloudbreak-2016-06-14-10-58
```