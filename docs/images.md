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

Register your custom image(s) in Cloudbreak by placing an image catalog `json` that
declare your custom images in a remotely available file through `HTTP/HTTPS` or the `/var/lib/cloudbreak-deployment/etc` directory on the Cloudbreak host. The
`etc` directory does not exist by default so you need to create it.

> Important: If you register images after Cloudbreak has been started, you may need to wait until the cached data will be refreshed.
Cloudbreak stores the image catalog related data only for 15 minutes.

### Structure of the image catalog JSON
The `JSON` file has two main sections the `images` that contains information about the burned images and the `versions` that contains the mappings between
Cloudbreak versions and the available image identifiers for them in the list under the `cloudrbeak` key.

The burned images are stored under the `images` main section in 3 categories based on the platform that is pre-warmed:
- `base-images` section of the not pre-warmed images
- `hdf-images` contains the HDF related images
- `hdp-images` contains the HDP related images

The image 'records' in the 3 categories are almost the same except that the `base-images` section's records doesn't contain the version and repo information
of the pre-warmed Ambari and platform (**HDF/HDP**). So the platform related images must contain the `version`, `repo` and `stack-details` fields. The `repo`
field must contain the Ambari's installer package **URL** by the given os-type. The `stack-details` field must contain a `version` field that is identifies
the version of the pre-warmed platform and a `repo` field that contains the necessary package information for the platform.

Every image 'record' must contain the `os`, `date`, `uuid` and `images` fields. The `uuid` field should be a unique identifier within the file and
the `images` field must contain a map that contains the image sets by a provider and an image set must store the virtual machine image ids by the related
region of the provider. The virtual machine image ids come from the result of the image burning process and must be an existing identifier of a virtual
machine image on the related provider side.
>The providers which use global images the region should be **`default`**, as the example `JSON` describes.

**Example image catalog:**
```
{
  "images": {
    "base-images": [
      {
        "date": "2017-10-13",
        "description": "Cloudbreak official base image",
        "images": {
          "mock": {
            "default": "mockimage/hdc-hdp--1710161226.tar.gz"
          }
        },
        "os": "centos7",
        "uuid": "f6e778fc-7f17-4535-9021-515351df3691"
      },
      {
        "date": "2017-10-13",
        "description": "Cloudbreak official base image",
        "images": {
          "aws": {
            "ap-northeast-1": "ami-78e9311e",
            "ap-northeast-2": "ami-84b613ea",
            "ap-southeast-1": "ami-75226716",
            "ap-southeast-2": "ami-92ce23f0",
            "eu-central-1": "ami-d95be5b6",
            "eu-west-1": "ami-46429e3f",
            "sa-east-1": "ami-86d5abea",
            "us-east-1": "ami-51a2742b",
            "us-west-1": "ami-21ccfe41",
            "us-west-2": "ami-2a1cdc52"
          },
          "gcp": {
            "default": "sequenceiqimage/hdc-hdp--1710161226.tar.gz"
          },
          "openstack": {
            "default": "hdc-hdp--1710161226"
          }
        },
        "os": "centos7",
        "uuid": "f6e778fc-7f17-4535-9021-515351df3692"
      }
    ],
    "hdf-images": [],
    "hdp-images": [
      {
        "date": "2017-08-07",
        "description": "Cloudbreak official image",
        "images": {
          "aws": {
            "ap-northeast-1": "ami-e621ca80",
            "ap-northeast-2": "ami-6a29f004",
            "ap-southeast-1": "ami-3e01985d",
            "ap-southeast-2": "ami-ed253c8e",
            "eu-central-1": "ami-76812f19",
            "eu-west-1": "ami-8d3dcbf4",
            "sa-east-1": "ami-1897e174",
            "us-east-1": "ami-5428072f",
            "us-west-1": "ami-36351e56",
            "us-west-2": "ami-b7d435cf"
          },
          "azure": null,
          "gcp": null,
          "openstack": null
        },
        "os": "centos6",
        "uuid": "2.4.2.2-1-aec0d3ca-e04a-47bf-9970-d649b0c579b9-2.5.0.1-265",
        "stack-details": {
          "repo": {
            "stack": {
              "redhat6": "http://private-repo-1.hortonworks.com/HDP/centos6/2.x/updates/2.5.0.1-265",
              "repoid": "HDP-2.5"
            },
            "util": {
              "redhat6": "http://private-repo-1.hortonworks.com/HDP-UTILS-1.1.0.21/repos/centos6",
              "repoid": "HDP-UTILS-1.1.0.21"
            }
          },
          "version": "2.5.0.1-265"
        },
        "repo": {
          "redhat6": "http://private-repo-1.hortonworks.com/ambari/centos6/2.x/updates/2.4.2.2-1/"
        },
        "version": "2.4.2.2-1"
      }
    ]
  },
  "versions": {
    "cloudbreak": [
      {
        "images": [
          "f6e778fc-7f17-4535-9021-515351df3691",
          "f6e778fc-7f17-4535-9021-515351df3692",
          "2.4.2.2-1-aec0d3ca-e04a-47bf-9970-d649b0c579b9-2.5.0.1-265"
        ],
        "versions": [
          "2.1.0-rc.1"
        ]
      }
    ]
  }
}
```