You can log into the Cloudbreak application at `https://<PUBLIC_IP>:443`.

The main goal of the Cloudbreak UI is to easily create clusters on your own cloud provider, or on your existing Mesos cluster.
This description details the Mesos setup - if you'd like to use a different cloud provider check out its manual.

This document explains the four steps that need to be followed to create Cloudbreak clusters from the UI:

- connect your Marathon API with Cloudbreak
- create some resource constraints on the UI that describe the resources needed by your cluster
- create a blueprint that describes the HDP services in your clusters
- launch the cluster itself based on the resource constraints and the HDP blueprint

>**IMPORTANT** Make sure that you have sufficient quota (CPU, memory) in your Mesos cluster for the requested cluster size.
