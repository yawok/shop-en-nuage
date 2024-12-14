variable "location" {
  type        = string
  description = "The Azure region where resources will be created"
}

variable "resource_group_name" {
  type        = string
  description = "The name of the resource group"
}

variable "environment" {
  type        = string
  description = "Environment (dev, staging, prod)"
  default     = "dev"
}

variable "project_prefix" {
  type        = string
  description = "Prefix for resource names"
  default     = "shop-en-nuage"
}

variable "mongodb_connection_string" {
  type        = string
  description = "MongoDB connection string to store in Key Vault"
  sensitive   = true
}

variable "key_vault_sku" {
  type        = string
  description = "The SKU of the Key Vault"
  default     = "standard"
}