import { Controller, Get, Post, Render, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { LoginGuard } from '../common/guards/login.guard';
import { Response } from 'express';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { AuthExceptionFilter } from '../common/filters/auth-exceptions.filter';


@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {

  @Get()
  @Render('login')
  index(@Request() req): { message: string } {
    return { message: req.flash('loginError') };
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login(@Res() res: Response) {
    res.redirect('/auth/home');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('home')
  @Render('home')
  getHome(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }

  @Get('logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }

}
