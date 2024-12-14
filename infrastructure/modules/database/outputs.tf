output "cosmosdb_connection_string" {
  value     = data.azurerm_cosmosdb_account_keys.main.primary_master_key
  sensitive = true
}

output "cosmos_db_endpoint" {
  value = azurerm_cosmosdb_account.main.endpoint
}

output "cosmos_db_name" {
  value = azurerm_cosmosdb_account.main.name
}
