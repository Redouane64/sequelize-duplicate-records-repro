import { Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UserEmail } from "./user-email.model";

@Table({
    tableName: 'users'
})
export class User extends Model<User, CreateUserDto> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string

    @Column
    username: string

    @HasOne(() => UserEmail, 'user_id')
    primaryEmail: UserEmail

    @HasOne(() => UserEmail, 'user_id')
    secondaryEmail: UserEmail
}