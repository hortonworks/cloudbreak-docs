# Custom Cloud Images

> Custom Images support is part of `TECHNICAL PREVIEW`. It may not be suitable for production use.

Every cloud platform comes with default images that contain packages required to build an Ambari and HDP stack. These default images are declared in yml files, which Cloudbreak loads upon start. You can customize these images and use them instead of the defaults. 

To overwrite the default yml files, place files declaring your custom images in the `/var/lib/cloudbreak-deployment/etc` directory. The etc directory does not exist by default so you need to create it.

The format of the yml files is platform-specific and described in the following sections.  

>`Note:` If you wish to change the images after Cloudbreak has been launched, you need to restart the application after updating the images.
 
## AWS
To override the default images, create the following file: `/var/lib/cloudbreak-deployment/etc/aws-images.yml` and replace its content by region as desired. The default content of the yml file is:
```
aws:
  ap-northeast-1: ami-76729917
  ap-northeast-2: ami-7c1ad112
  ap-southeast-1: ami-a7ac7fc4
  ap-southeast-2: ami-acf7decf
  eu-central-1: ami-71da331e
  eu-west-1: ami-cba43bb8
  sa-east-1: ami-f8901a94
  us-east-1: ami-bde327d0
  us-west-1: ami-b76421d7
  us-west-2: ami-d541bbb5
```

## Azure
To override the default images, create the following file: `/var/lib/cloudbreak-deployment/etc/arm-images.yml` and replace its content by region as desired. The default content of the yml file is:
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

## GCP
To override the default images, create the following file: `/var/lib/cloudbreak-deployment/etc/gcp-images.yml` and replace its content as desired. It is not required to have an image in every region, as the `default` is used everywhere. The default content of the yml file is:
```
gcp:
  default: sequenceiqimage/cb-2016-06-14-03-27.tar.gz
```

## OpenStack
To override the default images, create the following file: `/var/lib/cloudbreak-deployment/etc/os-images.yml` and replace its content as desired. It is not required to have an image in every region, as the `default` is used everywhere. The default content of the yml file is:
```
openstack:
  default: cloudbreak-2016-06-14-10-58
```