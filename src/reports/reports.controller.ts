import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  CounterGroupDto,
  CounterGroupResponseDto,
  CounterGroupSchema,
  PercentageDeletedResponseDto,
} from './schemas/zod.schema';

@UseGuards(AuthGuard('jwt'))
@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}

  @Get('deleted')
  @ApiResponse({ type: PercentageDeletedResponseDto })
  percentageDeleted() {
    return this.reportService.getPerecentageDeleted();
  }

  @Get('grouped')
  @ApiQuery({ type: CounterGroupDto })
  @ApiResponse({ type: CounterGroupResponseDto })
  grouped(@Query() query: any) {
    const filter = CounterGroupSchema.safeParse(query);

    if (!filter.success)
      throw new BadRequestException(filter.error.flatten().fieldErrors);

    return this.reportService.getCounterGroup(filter.data);
  }
}
