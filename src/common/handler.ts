import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { MongoError } from 'mongodb';

// For logging errors
const logger = new Logger('ErrorHandler');

/**
 * Handle validation errors from class-validator
 * @param errors - ValidationError array
 * @throws BadRequestException with formatted validation errors
 */
export function handleValidationError(errors: ValidationError | ValidationError[]): never {
  const errorsArray = Array.isArray(errors) ? errors : [errors];
  const formattedErrors = formatValidationErrors(errorsArray);

  logger.error(`Validation error: ${JSON.stringify(formattedErrors)}`);
  throw new BadRequestException({
    message: 'Validation failed',
    errors: formattedErrors,
    status: false,
  });
}

/**
 * Format validation errors into a more readable structure
 */
function formatValidationErrors(
  errors: ValidationError[],
  parentField = '',
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const error of errors) {
    const field = parentField ? `${parentField}.${error.property}` : error.property;

    if (error.constraints) {
      result[field] = Object.values(error.constraints);
    }

    if (error.children && error.children.length > 0) {
      const childErrors = formatValidationErrors(error.children, field);
      Object.assign(result, childErrors);
    }
  }

  return result;
}

/**
 * Handle MongoDB specific errors
 * @param error - MongoError
 * @throws appropriate exception based on MongoDB error code
 */
export function handleMongoError(error: MongoError): never {
  logger.error(`MongoDB error: ${error.code} - ${error.message}`);

  switch (error.code) {
    case 11000: // Duplicate key error
      throw new ConflictException({
        message: 'Duplicate entry found',
        error: formatDuplicateKeyError(error),
        status: false,
      });
    default:
      throw new InternalServerErrorException({
        message: 'Database operation failed',
        error: error.message,
        status: false,
      });
  }
}

/**
 * Format duplicate key error message to be more user-friendly
 */
function formatDuplicateKeyError(error: MongoError): string {
  const errorMessage = error.message;
  const keyValueMatch = errorMessage.match(/{\s+:\s+"(.+?)"\s+}/);

  if (keyValueMatch && keyValueMatch[1]) {
    return `The value "${keyValueMatch[1]}" already exists`;
  }

  return 'A record with the same unique fields already exists';
}

/**
 * Handle unexpected errors
 * @param error - Any error object
 * @throws InternalServerErrorException with appropriate message
 */
export function handleUnexpectedError(error: any): never {
  logger.error(`Unexpected error: ${error.message}`, error.stack);

  if (error instanceof NotFoundException) {
    throw error; // Rethrow NotFoundException as is
  }

  if (error instanceof UnauthorizedException || error instanceof ForbiddenException) {
    throw error; // Rethrow auth exceptions as is
  }

  if (error instanceof MongoError) {
    return handleMongoError(error);
  }

  // Default case for unexpected errors
  throw new InternalServerErrorException({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? undefined : error.message,
    status: false,
  });
}

/**
 * Main error handler that routes to appropriate specific handlers
 * @param error - Any error that might occur
 * @throws Appropriate exception based on error type
 */
export function handleError(error: any): never {
  if (
    error instanceof ValidationError ||
    (Array.isArray(error) && error[0] instanceof ValidationError)
  ) {
    return handleValidationError(error);
  }

  if (error instanceof MongoError) {
    return handleMongoError(error);
  }

  return handleUnexpectedError(error);
}
