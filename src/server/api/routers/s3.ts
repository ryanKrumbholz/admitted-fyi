import { TRPCError } from '@trpc/server';
import { createTRPCRouter, internalProcedure } from '../trpc';
import { z } from 'zod';
import { s3Client } from '~/server/clients/s3Client';

export const s3Router = createTRPCRouter({
  
    getPresignedUrl: internalProcedure
    .input(z.object({
        fileName: z.string(),
        fileType: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const { fileName, fileType } = input;
      const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Expires: 60, // Time in seconds before the presigned URL expires
        ContentType: fileType,
        ACL: 'public-read', // Adjust based on your bucket's policy
      };

      try {
        const presignedUrl: string = await s3Client.getSignedUrlPromise('putObject', s3Params);
        return { url: presignedUrl };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate S3 presigned URL',
        });
      }
    })
});
