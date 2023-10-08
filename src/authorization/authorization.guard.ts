import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import * as jwt from 'express-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTHO_AUDIENCE: string;
  private AUTHO_DOMAIN: string;

  constructor (private configService: ConfigService) {
    this.AUTHO_AUDIENCE = this.configService.get('AUTHO_AUDIENCE');
    this.AUTHO_DOMAIN = this.configService.get('AUTHO_DOMAIN');
  }
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);
    // console.log(req);
    // console.log(res);
    // console.log(`AUDIENCE: ${this.AUTHO_AUDIENCE}`);
    // console.log(`DOMAIN: ${this.AUTHO_DOMAIN}`);

    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTHO_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUTHO_AUDIENCE,
        issuer: this.AUTHO_DOMAIN,
        algorithms: ['RS256']
      })
    );

    try{
      await checkJwt(req, res);
      return true;
    } catch(error) {
      throw new UnauthorizedException(error);
    }
  }
}
