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

variable "vnet_address_space" {
  type        = list(string)
  description = "The address space for the virtual network"
  default     = ["10.0.0.0/16"]
}

variable "app_subnet_prefix" {
  type        = list(string)
  description = "The address prefix for the app subnet"
  default     = ["10.0.1.0/24"]
}

variable "db_subnet_prefix" {
  type        = list(string)
  description = "The address prefix for the database subnet"
  default     = ["10.0.2.0/24"]
}
