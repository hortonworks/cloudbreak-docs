You can log into the Cloudbreak application at `https://<Public_IP>:443/`.

The main goal of the Cloudbreak UI is to easily create clusters on your own cloud provider account.
This description details the AWS setup - if you'd like to use a different cloud provider check out its manual.

This document explains the four steps that need to be followed to create Cloudbreak clusters from the UI:

- connect your AWS account with Cloudbreak
- create some template resources on the UI that describe the infrastructure of your clusters
- create a blueprint that describes the HDP services in your clusters
- launch the cluster itself based on these resources

> **IMPORTANT** Make sure that you have sufficient qouta (CPU, network, etc) for the requested cluster size.