import { Controller, Get } from '@nestjs/common';

@Controller('films')
export class FilmsController {
  @Get()
  getFilms() {}

  @Get(':id/schedule')
  getSchedule() {}
}
