import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CounterProductEnumSchema = z.enum(['brand', 'category', 'color']);

export const CounterDataSchema = z.object({
  count: z.number(),
  field: z.string(),
});

export const CounterGroupSchema = z.object({
  field: CounterProductEnumSchema,
});

export const PercentageDeletedResponseSchema = z.object({
  total: z.number(),
  deleted: z.number(),
  percentage: z.number(),
});

export const CounterGroupResponseSchema = z.array(CounterDataSchema);

export type PercentageDeletedResponse = z.infer<
  typeof PercentageDeletedResponseSchema
>;

export class CounterGroupDto extends createZodDto(CounterGroupSchema) {}
export class PercentageDeletedResponseDto extends createZodDto(
  PercentageDeletedResponseSchema,
) {}
export class CounterGroupResponseDto extends createZodDto(
  CounterGroupResponseSchema,
) {}
