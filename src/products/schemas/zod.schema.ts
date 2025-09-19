import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const PaginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

const ProductFieldSchema = z.object({
  sku: z.string(),
  name: z.string(),
  brand: z.string(),
  model: z.string(),
  category: z.string(),
  color: z.string(),
  price: z.number().optional(),
  currency: z.string(),
  stock: z.number(),
});

const ProductSchema = ProductFieldSchema.extend({
  id: z.string(),
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),
});

const ItemSchema = z.object({
  fields: ProductFieldSchema,
});

export const ContentfulResponseSchema = z.object({
  items: z.array(ItemSchema),
});

export const ListProductsResponseSchema = z.object({
  data: z.array(ProductSchema),
  meta: PaginationSchema,
});

export const FilterProductSchema = z.object({
  sku: z.string().optional(),
  name: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  category: z.string().optional(),
  color: z.string().optional(),
  priceFrom: z.coerce.number().optional(),
  priceTo: z.coerce.number().optional(),
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).max(100).default(5).optional(),
});

export const CounterDataSchema = z.object({
  count: z.number(),
  field: z.string(),
});

export const CounterGroupResponseSchema = z.array(CounterDataSchema);

export type ContentfulResponse = z.infer<typeof ContentfulResponseSchema>;
export type ListProductsResponse = z.infer<typeof ListProductsResponseSchema>;
export type CounterGroupResponse = z.infer<typeof CounterGroupResponseSchema>;
export type ProductData = z.infer<typeof ProductSchema>;

export class ProductResponseDto extends createZodDto(ProductSchema) {}
export class FilterProductDto extends createZodDto(FilterProductSchema) {}
export class ListProductsResponseDto extends createZodDto(
  ListProductsResponseSchema,
) {}
