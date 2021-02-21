import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as exphbs from 'express-handlebars';

import {FirestoreStore} from '@google-cloud/connect-firestore';
import * as admin from 'firebase-admin';
import * as flash from 'connect-flash';

admin.initializeApp({
  projectId: 'project-boston-8361e',
  credential: admin.credential.applicationDefault()
});

const firestore = admin.firestore();

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const viewsPath = join(__dirname, '../views');
  app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');


  app.use(
    session({
      store: new FirestoreStore({
        dataset: firestore,
        kind: 'express-sessions',
      }),
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());


  await app.listen(3000);
}
bootstrap();
