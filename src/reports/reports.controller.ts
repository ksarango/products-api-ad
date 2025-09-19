import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  CounterGroupDto,
  CounterGroupSchema,
  PercentageDeletedResponseDto,
} from './schemas/zod.schema';

@UseGuards(AuthGuard('jwt'))
@Controller('api/reports')
@ApiBearerAuth('access-token')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}

  @Get('deleted')
  @ApiResponse({ status: HttpStatus.OK, type: PercentageDeletedResponseDto })
  percentageDeleted() {
    return this.reportService.getPerecentageDeleted();
  }

  @Get('grouped')
  @ApiQuery({ type: CounterGroupDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Counter data' })
  grouped(@Query() query: any) {
    const filter = CounterGroupSchema.safeParse(query);

    if (!filter.success)
      throw new BadRequestException(filter.error.flatten().fieldErrors);

    return this.reportService.getCounterGroup(filter.data);
  }
}
