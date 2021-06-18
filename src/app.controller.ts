import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  SetMetadata,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { NoPassRespInterceptor } from './users/interceptor/nopassresp.interceptor';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Role } from './roles/role.enum';
import { RolesGuard, ROLES_KEY } from './roles/roles.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(NoPassRespInterceptor)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @SetMetadata(ROLES_KEY, [Role.Admin])
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/register')
  async register(@Request() req) {
    return this.authService.register(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/restore')
  async restore(@Request() req) {
    return this.authService.restore(req.user);
  }
}
