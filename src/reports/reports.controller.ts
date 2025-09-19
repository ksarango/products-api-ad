import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { PercentageDeletedResponseDto } from './schemas/zod.schema';

@UseGuards(AuthGuard('jwt'))
@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}

  @Get('deleted')
  @ApiResponse({ type: PercentageDeletedResponseDto })
  findAll() {
    return this.reportService.getPerecentageDeleted();
  }
}
