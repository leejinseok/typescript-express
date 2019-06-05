import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'user'})
class User {
  @PrimaryGeneratedColumn()
  itemId: number;

  @Column()
  name: string;

  @Column()
  email: string;
}

export default User;