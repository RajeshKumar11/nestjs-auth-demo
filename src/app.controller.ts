import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { PermissionsGuard } from './authorization/permissions.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/public')
  getPublic(): string {
    return this.appService.getPublic();
  }

  @UseGuards(AuthorizationGuard)
  @Get('/protected')
  getProtected(): string {
    return this.appService.getPrivate();
  }

  @Get('/dog')
  getDog(): string {
    return this.appService.getDog();
  }


  // @UseGuards(AuthorizationGuard)
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @SetMetadata('permissions', ['read:cats'])
  @Get('/cat')
  getCat(): string {
    return this.appService.getCat();
  }
}
