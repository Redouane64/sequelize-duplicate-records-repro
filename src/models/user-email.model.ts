import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
    tableName: 'user_emails'
})
export class UserEmail extends Model<UserEmail, { email: string }> {

    @Column({
        type: DataType.STRING,
        primaryKey: true,
    })
    email: string

    @ForeignKey(() => User)
    @Column({ field: 'user_id' })
    userId: string

    @BelongsTo(() => User, 'user_id')
    user: User
}