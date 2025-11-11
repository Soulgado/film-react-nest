import { Film } from './film.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  daytime: Date;

  @Column({ type: 'varchar' })
  hall: string;

  @Column({ type: 'int' })
  rows: number;

  @Column({ type: 'int' })
  seats: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'simple-array', nullable: true })
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}
