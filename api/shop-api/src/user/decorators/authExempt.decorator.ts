import { SetMetadata } from "@nestjs/common";

export const IS_PUBLICLY_ACCESSIBLE = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLICLY_ACCESSIBLE, true);