import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEmail } from './models/user-email.model';
import { User } from './models/user.model';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: Sequelize,
      useFactory: async (): Promise<Sequelize> => {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'identity-app',
        });
        sequelize.addModels([User, UserEmail]);
        
        await sequelize.drop()

        await sequelize.sync({ alter: true });

        //const email = await sequelize.model(UserEmail).create({ email: "jackles@gmail.com" })
        await sequelize.model(User).create({
          username: 'jackles',
          primaryEmail: { email: "jackles@gmail.com" },
          secondaryEmail: { email: "jackles0000@gmail.com" }

        }, { include: [
          { association: 'primaryEmail', include: [{association: 'user'}] },
          { association: 'secondaryEmail', include: [{association: 'user'}] }

        ]})


        const user = await sequelize.model(User).findAll({ 
          include: [
            { association: 'primaryEmail', as: 'pe' },
            { association: 'secondaryEmail', as: 'se' }
          ]
        })

        console.log(JSON.stringify(user, undefined, 4))
        return sequelize;
      },
    },
  ],
})
export class AppModule {}
