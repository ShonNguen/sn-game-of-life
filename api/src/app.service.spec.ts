import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe(AppService.name, () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe(AppService.prototype.generateExpansion.name, () => {
    it('should expand the grid by the given value', () => {
      const initialGrid = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];

      const expectedExpandedGrid = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ];
      const expandedGrid = appService.generateExpansion(initialGrid);
      expect(expandedGrid).toEqual(expandedGrid);
      expect(expandedGrid[1][1]).toBe(1);
      expect(expandedGrid[2][2]).toBe(1);
    });
  });

  describe(AppService.prototype.nextGeneration.name, () => {
    it('should return a new next generation grid', () => {
      const grid = [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ];
      const expectedGrid = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 1],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ];
      const nextGrid = appService.nextGeneration(grid);
      expect(nextGrid).toEqual(expectedGrid);
    });
  });

  describe(AppService.prototype.cellEvaluation.name, () => {
    it('should return 1 for a dead cell with 3 live neighbors', () => {
      const grid = [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
      ];
      expect(appService.cellEvaluation(1, 1, grid)).toBe(1);
    });

    it('should return 1 for a live cell with 2 live neighbors', () => {
      const grid = [
        [1, 1, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      expect(appService.cellEvaluation(1, 1, grid)).toBe(1);
    });

    it('should return 0 for a live cell with less than 3 live neighbors', () => {
      const grid = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      expect(appService.cellEvaluation(0, 0, grid)).toBe(0);
    });

    it('should return 0 for a live cell with less more than 3 live neighbors', () => {
      const grid = [
        [1, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ];
      expect(appService.cellEvaluation(0, 1, grid)).toBe(0);
    });
  });
});
