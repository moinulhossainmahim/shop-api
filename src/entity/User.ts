import { UserStatus } from 'src/users/enums/user-status.enum';
import { Role } from 'src/users/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  email: string;

  @Column()
  salt: string;

  @Column({ default: Role.Customer })
  userType: Role;

  @Column({ default: UserStatus.Active })
  status: UserStatus;
}
