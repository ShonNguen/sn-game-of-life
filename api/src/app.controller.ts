import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('grid/:id')
  getGrid(
    @Param('id') id: number
  ) {
    const generatedCenterGrid = this.appService.generateGrid();
    const expandedGrid = this.appService.generateExpansion(generatedCenterGrid, +id);
    return expandedGrid;
  }
}
