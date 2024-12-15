terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>4.13.0"

    }
  }
}

provider "azurerm" {
  features {}

  subscription_id     = var.subscription_id
}

resource "azurerm_resource_group" "main" {
  name = var.resource_group_name
  location = var.location
}

module "network" {
  source              = "./modules/network"
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name
  project_prefix      = var.project_prefix
}

module "database" {
  source              = "./modules/database"
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name
  subscription_id     = var.subscription_id
  project_prefix      = var.project_prefix
}

module "app_service" {
  source              = "./modules/app_service"
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name
  project_prefix      = var.project_prefix
}

module "security" {
  source                    = "./modules/security"
  location                  = var.location
  resource_group_name       = azurerm_resource_group.main.name
  project_prefix            = var.project_prefix
  mongodb_connection_string = module.database.cosmosdb_connection_string
}