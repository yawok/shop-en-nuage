output "vnet_id" {
  value       = azurerm_virtual_network.main.id
  description = "The ID of the virtual network"
}

output "app_subnet_id" {
  value       = azurerm_subnet.app.id
  description = "The ID of the app subnet"
}

output "db_subnet_id" {
  value       = azurerm_subnet.db.id
  description = "The ID of the database subnet"
}

output "app_nsg_id" {
  value       = azurerm_network_security_group.app.id
  description = "The ID of the app network security group"
}

output "vnet_name" {
  value       = azurerm_virtual_network.main.name
  description = "The name of the virtual network"
}