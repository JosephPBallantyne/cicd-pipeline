import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class WeatherLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
