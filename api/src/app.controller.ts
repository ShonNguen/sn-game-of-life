import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('grid')
  generateGrid(@Query('x') x = 10, @Query('y') y = 10) {
    const generatedGrid = this.appService.generateGrid(+x, +y);
    const grid = this.appService.generateExpansion(generatedGrid, 2);
    return { grid };
  }

  @Post('next')
  nextGeneration(@Body() body: { grid: number[][] }) {
    if (!body.grid) {
      throw new BadRequestException('Missing grid in body');
    }

    const next = this.appService.nextGeneration(body.grid);
    return { grid: next };
  }

  @Get('test')
  test() {
    // 1. generates grid
    const generatedCenterGrid = this.appService.generateGrid(4, 4);
    // 2. expand two times to have room
    const expandedGrid = this.appService.generateExpansion(generatedCenterGrid, 1);
    // 3. 5 generations
    const generationRounds = 10;
    let currentGrid: number[][] = [];
    for (let i = 0; i < generationRounds; i++) {
      if (i === 0) {
        currentGrid = expandedGrid;
      }

      const nextGeneration = this.appService.nextGeneration(currentGrid);
      currentGrid = nextGeneration;
    }
    // 4. returns last generated
    return currentGrid;
  }
}
