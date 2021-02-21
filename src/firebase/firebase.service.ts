import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';


@Injectable()
export class FirebaseService {
  public auth = admin.auth();
  public firestore = admin.firestore();
}
