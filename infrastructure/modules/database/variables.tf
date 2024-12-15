variable "subscription_id" {
  type        = string
  description = "Azure subscription ID"
}

variable "resource_group_name" {
  type        = string
  description = "Name of the resource group"
  default     = "MyResourceGroup"
}

variable "location" {
  type        = string
  description = "Azure region"
  default     = "francecentral"
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