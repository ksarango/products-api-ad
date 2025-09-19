import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const PercentageDeletedResponseSchema = z.object({
  total: z.number(),
  deleted: z.number(),
  percentage: z.number(),
});

export type PercentageDeletedResponse = z.infer<
  typeof PercentageDeletedResponseSchema
>;

export class PercentageDeletedResponseDto extends createZodDto(
  PercentageDeletedResponseSchema,
) {}
