# Update Cloudbreak Deployer

To update Cloudbreak Deployer to the newest version, run the following commands on the console where your `Profile` is located.

We recommend that you back up the Cloudbreak databases before upgrading. Refer to [Dump and Restore Database](cloudbreak_database.md/#dump-and-restore-database).

1. Stop all of the running Cloudbreak components:
    <pre>cbd kill</pre>
    
2. Update Cloudbreak Deployer:

    <pre>cbd update<pre>

3. Update the `docker-compose.yml` file with new Docker containers needed for the `cbd`:

    <pre>cbd regenerate</pre>

4. If there are no other Cloudbreak instances that still use old Cloudbreak versions, remove the obsolete containers:

    <pre>cbd util cleanup</pre>

5. Check the health and version of the updated `cbd`: 

    <pre>cbd doctor</pre>

6. Start the new version of the `cbd`:

    <pre>cbd start</pre>

    > Cloudbreak needs to download updated docker images for the new version, so this step may take a while.
    

# Update Existing Clusters

Upgrading from version `1.4.0` to newer versions (`1.5.0` or `1.6.0`) doesn't require any manual modification from the users.

If Cloudbreak has been updated from `1.3.0` to `1.4.0` version then existing clusters need to be updated to be still managable through Cloudbreak.
To update existing clusters from `1.3.0` to `1.4.0` or newer versions, run the following commands on the `cbgateway` node of the cluster:

- Update the version of the Salt-Bootsrap tool on the nodes:
```
salt '*' cmd.run 'curl -Ls https://github.com/hortonworks/salt-bootstrap/releases/download/v0.1.2/salt-bootstrap_0.1.2_Linux_x86_64.tgz | tar -zx -C /usr/sbin/ salt-bootstrap'
```
- Trigger restart of tool on the nodes:
```
salt '*' service.dead salt-bootstrap
```
> **NOTE** Checking the version of the Salt-Bootsrap on the nodes:
>
>```
>salt '*' cmd.run 'salt-bootstrap --version'
>```
