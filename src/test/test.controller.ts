import { Controller, Post, Session, Request, Get, Render, Response, UseFilters, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/user.decorator';
import { FirebaseService } from '../firebase/firebase.service';
import { AuthExceptionFilter } from '../common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

@Controller('test')
@UseFilters(AuthExceptionFilter)
export class TestController {


  constructor(
    private firebaseService: FirebaseService,
  ) {
  }


  @Get()
  @Render('test')
  index(@CurrentUser() ses, @Request() req: Request) {

  }


  @Post()
  @UseGuards(AuthenticatedGuard)
  create(@CurrentUser() user: any) {

    this.firebaseService.firestore.collection('test').add({
      userId: user.userId,
      name: 'Hello World',
    });

    return "Hello World"

  }


}
