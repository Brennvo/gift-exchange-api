import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { keys } from '../../config/keys';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: keys.google.id,
      clientSecret: keys.google.secret,
      callbackURL: 'http://localhost:3001/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile, cb) {
    const user = {
      googleId: profile.id,
      username: profile.displayName,
    };
    return user;
  }
}
