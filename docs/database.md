# Ambari Database

> Ambari Database support is part of `TECHNICAL PREVIEW`. It may not be suitable for production use.

By default, Ambari uses an embedded database to store data. However, Ambari and Cloudbreak don't perform backups of this database, so although this database is sufficient for ephemeral or test clusters, it is not be sufficient for long-running production clusters. Therefore, you may need to configure a remote database for Ambari in Cloudbreak.  

You have two options for configuring a remote database: you can set up a supported database on your own or use a cloud provider's database service. Next, you need to pass the details to Cloudbreak during cluster creation, and Cloudbreak will configure Ambari to connect to that remote database. 

Cloudbreak supports out of the box PostgreSQL, MariaDB and MySQL. This means that if you are using any of these databases, you only need to create the database itself and configure user permissions to create the cluster. Cloudbreak will initialize database tables, relations, default values, and will download JDBC driver for Ambari. For other databases, you have to execute create SQL on your database and deliver JDBC driver to `/opt/jdbc-drivers` directory on Ambari server node.

## Important Considerations

Consider these constraints when setting up your remote datatabse:   

- Cloudbreak doesn't validate the database connection, so wrong connection parameters will cause the cluster installation to fail.
- Your database must be available to the Ambari server. Note that:
    - The database must be located in the same region as the Ambari cluster. Slow database connection will cause cluster installation fail.
    - The database could be on a public server with firewall protection, but for security reasons we suggest that you use a private virtual network with subnet, and configure the Cloudbreak network to use existing resources.
 - For the supported out of the box databases, Cloudbreak creates the tables and upgrades Ambari if neccessary, but performing any other operations on the database is your responsibility.
- If you selected PostgreSQL, Ambari must use the `public` schema. It is not possible to configure a different schema.
- Database name, username, and password should not contain the `'` character. Other special characters are allowed.


## Configure Database with the Web UI

You can find database configuration in the ***Configure Ambari Database*** tab, under ***Advanced options***:

![](/images/ambari-database.png)
<sub>*Full size [here](/images/ambari-database.png).*</sub>

## Configure Database with the Shell

To configure a remote database for Ambari with Cloudbreak shell, use `database configure` command before `cluster create` command. The syntax is:

```
database configure --vendor [vendor] --host [host-or-ip] --port [port] --name [database-name] --username [user-name] --password [password]
```

Accepted `vendor` values are:

- MARIADB
- MSSQL
- MYSQL
- ORACLE
- POSTGRES
- SQLANYWHERE

### Upgrade the JDBC Driver

During installation, Cloudbreak distributes the JDBC driver for Ambari to different locations. If you want to upgrade the driver or use a different one, you have to perform these steps:

1. Copy the driver to the `/var/lib/ambari-server/jdbc-drivers` directory.
2. Symlink the driver to `/usr/share/java`, `/usr/lib/jvm/java/jre/lib/ext` directories.
3. Reconfigure Ambari by executing the `ambari-server setup --jdbc-db=[db-vendor] --jdbc-driver=[driver-location]` command.

