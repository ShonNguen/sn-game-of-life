import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('grid')
  generateGrid(@Query('row') row = 10, @Query('col') col = 10) {
    const generatedGrid = this.appService.generateGrid(+row, +col);
    const grid = this.appService.generateExpansion(generatedGrid);
    return grid;
  }

  @Post('next')
  nextGeneration(@Body() body: { grid: number[][] }) {
    if (!body.grid) {
      throw new BadRequestException('Missing grid in request body');
    }

    const next = this.appService.nextGeneration(body.grid);
    return next;
  }
}
