import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ApiError } from '../../utils/ApiError';
import crypto from 'crypto';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;
const publicDomain = process.env.R2_PUBLIC_DOMAIN;

let s3Client: S3Client | null = null;

if (accountId && accessKeyId && secretAccessKey) {
  s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
} else {
  console.warn('⚠️ Cloudflare R2 credentials not fully provided in .env. File uploads will fail.');
}

export async function generatePresignedUrl(fileName: string, contentType: string) {
  if (!s3Client || !bucketName || !publicDomain) {
    throw ApiError.internal('Storage is not configured properly. Missing Cloudflare R2 keys.');
  }

  // Generate a safe unique key
  const uniqueId = crypto.randomBytes(8).toString('hex');
  const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const fileKey = `uploads/${Date.now()}-${uniqueId}-${safeFileName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    ContentType: contentType,
  });

  try {
    // Generate URL that expires in 5 minutes
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    
    // The public URL where the file will be accessible after upload
    const publicUrl = `${publicDomain}/${fileKey}`;

    return {
      uploadUrl,
      publicUrl,
      fileKey
    };
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw ApiError.internal('Failed to generate upload link.');
  }
}
