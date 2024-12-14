output "key_vault_id" {
  value       = azurerm_key_vault.main.id
  description = "The ID of the Key Vault"
}

output "key_vault_uri" {
  value       = azurerm_key_vault.main.vault_uri
  description = "The URI of the Key Vault"
}

output "app_identity_id" {
  value       = azurerm_user_assigned_identity.app_identity.id
  description = "The ID of the user assigned managed identity"
}

output "app_identity_principal_id" {
  value       = azurerm_user_assigned_identity.app_identity.principal_id
  description = "The principal ID of the user assigned managed identity"
}

output "app_identity_client_id" {
  value       = azurerm_user_assigned_identity.app_identity.client_id
  description = "The client ID of the user assigned managed identity"
}