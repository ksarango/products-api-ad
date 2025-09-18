import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}

  @Get('deleted')
  findAll() {
    return this.reportService.getPerecentageDeleted();
  }
}
