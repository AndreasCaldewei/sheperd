// src/app.controller.ts
import { Controller, Get, Post, Request, Res, Render, UseGuards, UseFilters } from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';

@Controller()
export class AppController {

}
