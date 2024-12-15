output "app_service_url" {
  value       = module.app_service.app_service_url
  description = "The URL of the web application"
}

output "database_connection_string" {
  value       = module.database.cosmosdb_connection_string
  sensitive   = true
  description = "Database connection string"
}

output "vnet_id" {
  value       = module.network.vnet_id
  description = "The ID of the virtual network"
}

output "key_vault_uri" {
  value       = module.security.key_vault_uri
  description = "The URI of the Key Vault"
}

output "app_identity_id" {
  value       = module.security.app_identity_id
  description = "The ID of the managed identity"
}