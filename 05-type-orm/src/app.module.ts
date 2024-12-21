import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

// establishing the database connection
const connection = TypeOrmModule.forRoot({
  type: 'sqlite',
  // name of the database, this will also create a file with that name.
  database: 'db.sqlite',
  // entities are basically the schemas of how User or Report should look like.
  entities: [User, Report],
  // this is a feature which is only availible in development.
  // it migrates the database's table according to the entity.
  // so any updated on the structure of the entity can be handled by this feature.
  synchronize: true,
});

// How to view the SQLite database?
// install the SQLite extension, open command palette("Ctrl+Shift+P" on windows).
// run "SQLite: Open Database" command.
// select the file named in the forRoot.
// now there is an additional section in the file explorer called "SQLITE EXPLORER".

@Module({
  imports: [connection, UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
