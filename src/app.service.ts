import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(
    @Inject(Sequelize)
    private readonly _sequelize: Sequelize,
  ) {}

}
