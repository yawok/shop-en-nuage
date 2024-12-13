data "azurerm_cosmosdb_account_keys" "main" {
  name                = azurerm_cosmosdb_account.main.name
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_cosmosdb_account" "main" {
  name                      = "${var.project_prefix}-db"
  location                  = var.location
  resource_group_name       = var.resource_group_name
  offer_type               = "Standard"
  kind                     = "MongoDB"


  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = var.location
    failover_priority = 0
  }
}


