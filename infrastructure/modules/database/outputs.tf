output "cosmosdb_connection_string" {
  value     = azurerm_cosmosdb_account.main.primary_sql_connection_string
  sensitive = true
}

output "cosmos_db_endpoint" {
  value = azurerm_cosmosdb_account.main.endpoint
}

output "cosmos_db_name" {
  value = azurerm_cosmosdb_account.main.name
}
