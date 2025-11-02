import { Logger } from '@nestjs/common';

interface EnvVariable {
  key: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

const envVariables: EnvVariable[] = [
  // Database Configuration (Required)
  {
    key: 'DB_HOST',
    required: true,
    description: 'Database host address',
  },
  {
    key: 'DB_PORT',
    required: true,
    description: 'Database port',
  },
  {
    key: 'DB_USERNAME',
    required: true,
    description: 'Database username',
  },
  {
    key: 'DB_PASSWORD',
    required: true,
    description: 'Database password',
  },
  {
    key: 'DB_NAME',
    required: true,
    description: 'Database name',
  },

  // JWT Configuration (Required)
  {
    key: 'JWT_SECRET',
    required: true,
    description: 'JWT access token secret (min 32 characters recommended)',
  },
  {
    key: 'JWT_REFRESH_SECRET',
    required: true,
    description: 'JWT refresh token secret (min 32 characters recommended)',
  },

  // Server Configuration (Optional with defaults)
  {
    key: 'PORT',
    required: false,
    description: 'Server port',
    defaultValue: '3000',
  },
  {
    key: 'FRONTEND_URL',
    required: false,
    description: 'Frontend URL for CORS configuration',
    defaultValue: '*',
  },
];

export function validateEnvironment(): void {
  const logger = new Logger('EnvironmentValidation');
  const errors: string[] = [];
  const warnings: string[] = [];

  logger.log('🔍 Validating environment variables...');

  envVariables.forEach((envVar) => {
    const value = process.env[envVar.key];

    if (!value || value.trim() === '') {
      if (envVar.required) {
        errors.push(
          `❌ Missing required environment variable: ${envVar.key} - ${envVar.description}`,
        );
      } else {
        const defaultMsg = envVar.defaultValue
          ? ` (using default: ${envVar.defaultValue})`
          : '';
        warnings.push(
          `⚠️  Optional environment variable not set: ${envVar.key} - ${envVar.description}${defaultMsg}`,
        );
      }
    } else {
      // Additional validation for JWT secrets
      if (
        (envVar.key === 'JWT_SECRET' || envVar.key === 'JWT_REFRESH_SECRET') &&
        value.length < 32
      ) {
        warnings.push(
          `⚠️  ${envVar.key} is shorter than 32 characters. Consider using a longer secret for better security.`,
        );
      }

      logger.log(`✅ ${envVar.key}: Set`);
    }
  });

  // Display warnings
  if (warnings.length > 0) {
    logger.warn('\n⚠️  WARNINGS:');
    warnings.forEach((warning) => logger.warn(warning));
  }

  // Display errors and throw if any required variables are missing
  if (errors.length > 0) {
    logger.error('\n❌ ERRORS:');
    errors.forEach((error) => logger.error(error));
    logger.error(
      '\n💡 Please check your .env file or environment configuration.',
    );
    logger.error(
      '📖 Refer to .env.example for the list of required variables.\n',
    );
    throw new Error(
      'Environment validation failed: Missing required environment variables',
    );
  }

  logger.log('\n✅ Environment validation completed successfully!\n');
}

export function getEnvVariablesList(): EnvVariable[] {
  return envVariables;
}
