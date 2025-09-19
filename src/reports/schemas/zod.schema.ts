import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CounterProductEnumSchema = z.enum(['brand', 'category', 'color']);

export const CounterGroupSchema = z.object({
  field: CounterProductEnumSchema,
});

export const PercentageDeletedResponseSchema = z.object({
  total: z.number(),
  deleted: z.number(),
  percentage: z.number(),
});

export type PercentageDeletedResponse = z.infer<
  typeof PercentageDeletedResponseSchema
>;

export class CounterGroupDto extends createZodDto(CounterGroupSchema) {}
export class PercentageDeletedResponseDto extends createZodDto(
  PercentageDeletedResponseSchema,
) {}
