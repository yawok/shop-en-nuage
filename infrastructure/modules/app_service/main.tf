resource "azurerm_service_plan" "main" {
  name                = "shop-en-nuage-plan"
  location            = var.location
  resource_group_name = var.resource_group_name
  os_type            = "Linux"
  sku_name           = "B1"
}

resource "azurerm_linux_web_app" "main" {
  name                = "shop-en-nuage-app"
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id     = azurerm_service_plan.main.id

  site_config {
    application_stack {
      node_version = "18-lts"
    }
  }
}