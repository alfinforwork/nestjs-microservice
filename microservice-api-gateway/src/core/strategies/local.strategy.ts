// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { User } from 'src/models';
// import { UserService } from 'src/services/user/user.service';
// import { JsonError } from 'src/helpers/main.helper';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private userService: UserService) {
//     super();
//   }

//   async validate(email: string): Promise<User> {
//     const user = await this.userService.findByEmail(email);
//     if (!user) {
//       throw new UnauthorizedException(JsonError('Unauthorized'));
//     }
//     return user;
//   }
// }
