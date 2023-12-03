import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const versionQuery = await database.query(
    "SELECT split_part(version(), ' ', 2) AS postgres_version;",
  );
  const maxConnectionsQuery = await database.query("SHOW MAX_CONNECTIONS;");

  const activeConnectionsQuery = await database.query(
    "SELECT count(distinct(numbackends)) FROM pg_stat_database;",
  );

  const version = parseFloat(versionQuery.rows[0].postgres_version);
  const maxConnections = new Number(
    maxConnectionsQuery.rows[0].max_connections,
  );
  const activeConnections = new Number(activeConnectionsQuery.rows[0].count);

  response.status(200).json({
    updated_at: updatedAt,
    version: version,
    max_connections: maxConnections,
    active_connections: activeConnections,
  });
}

export default status;
