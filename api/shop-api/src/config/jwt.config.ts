import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
	constructor(private _configService: ConfigService) {}
	createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
		return {
			secret: this._configService.get<string>('JWT_SECRET'),
			global: true,
		}
	}

}