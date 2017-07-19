Docs repository for the **Cloudbreak** project. The generated site is available at: http://hortonworks.github.io/cloudbreak-docs/

## Cut a new release:

Follow these steps

- [ ] Change sitename in [mkdocs.yml](https://github.com/hortonworks/cloudbreak-docs/blob/master/mkdocs.yml#L1)
- [ ] Refresh image references: `make update-images`
- [ ] Refresh on-prem version in curl instructions: [onprem.md](https://github.com/hortonworks/cloudbreak-docs/blob/master/docs/onprem.md#install-cloudbreak-deployer-1)
- [ ] Refresh Azure template reference: [setup.md](https://github.com/hortonworks/cloudbreak-docs/blob/master/docs/azure/setup.md#deploy-using-the-azure-portal)
- [ ] Update  where the **latest** version dropdown should point: [circle.yml](https://github.com/hortonworks/cloudbreak-docs/blob/master/circle.yml#L20)
- [ ] Cut a new  branch `release-x.y.z`

## tl;dr

When you create a release branch (like `release-1.6.0`) and push it  to github, CircleCI will automatically generate a new directory (named as the  branch (like  release-1.6.0) in the [gh-pages branch](https://github.com/hortonworks/cloudbreak-docs/tree/gh-pages).

So you will be able to  view that version, by modifying the version part of the url: http://hortonworks.github.io/cloudbreak-docs/release-1.6.0/

The version dropdown box is generated from the [versions.json](https://github.com/hortonworks/cloudbreak-docs/blob/gh-pages/versions.json).

The latest label is specified in  [circle.yml](https://github.com/hortonworks/cloudbreak-docs/blob/master/circle.yml#L20)
