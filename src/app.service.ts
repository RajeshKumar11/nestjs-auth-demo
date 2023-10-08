import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getPublic(): string {
    return 'This is a public resource. Welcome visitor!';
  }

  getPrivate(): string {
    return 'This is a protected resource. Welcome member 11';
  }

  getDog(): string {
    return 'I am a dog, please pet me!';
  }

  getCat(): string {
    return 'I am a cat, please let me sleep!';
  }
}
