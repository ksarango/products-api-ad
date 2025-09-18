import { Inject, Injectable } from '@nestjs/common';
import {
  ContentfulResponse,
  ContentfulResponseSchema,
} from '../schemas/zod.schema';
import type { AppConfig } from 'src/config/config.interface';

@Injectable()
export class ContentfulRepository {
  private host: string;
  private accessToken: string;
  private contentType: string;
  private spaceId: string;
  private env: string;

  constructor(@Inject('AppConfig') private readonly config: AppConfig) {
    const {
      host,
      apiKey,
      contentType = '',
      spaceId = '',
      env = '',
    } = config.externalEndpoints.contentful;
    this.host = host;
    this.accessToken = apiKey;
    this.contentType = contentType;
    this.spaceId = spaceId;
    this.env = env;
  }

  async retrieveProducts(): Promise<ContentfulResponse> {
    const params = new URLSearchParams({
      access_token: this.accessToken,
      content_type: this.contentType,
    });
    const url = `${this.host}/spaces/${this.spaceId}/environments/${this.env}/entries?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok)
      throw new Error(
        `HTTP error status: ${response.status}. Fetch Contentful Products`,
      );

    const productsData = ContentfulResponseSchema.safeParse(
      await response.json(),
    );

    if (!productsData.success) throw new Error(productsData.error.message);

    return Promise.resolve(productsData.data);
  }
}
