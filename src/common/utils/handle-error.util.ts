import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function handleError(error: any): never {
  if (error instanceof HttpException) {
    throw error;
  }

  console.error('Unhandled error:', error);
  throw new InternalServerErrorException();
}
