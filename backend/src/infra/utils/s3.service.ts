import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { FastifyRequest } from "fastify";
import { DomainException } from "../../core/exceptions/domain.exception";

export class ImageUploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly bucketRegion: string;

  constructor() {
    this.bucketRegion = process.env.AWS_REGION ?? "us-east-1";
    this.s3Client = new S3Client({
      region: this.bucketRegion,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
      },
    });
    this.bucketName = process.env.AWS_S3_BUCKET ?? "";
    if (!this.bucketName) {
      throw new Error("AWS_S3_BUCKET not set");
    }
  }

  async uploadFile(req: FastifyRequest): Promise<{ url: string }> {
    const file = await req.file();

    console.log("File", file);

    if (!file) {
      throw new DomainException("The file could not be empty.");
    }

    const ext = this.getExtension(file.filename);
    const fileKey = `${new Date().getTime().toString()}${ext}`;

    const fileBuffer = await file.toBuffer();

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3Client.send(command);
      return {
        url: `https://${this.bucketName}.s3.${this.bucketRegion}.amazonaws.com/${fileKey}`,
      };
    } catch (error) {
      console.error("Erro ao fazer upload para o S3:", error);
      throw new Error("Falha no upload do arquivo.");
    }
  }

  private getExtension(filename: string): string {
    const ext = filename.split(".").pop();
    return ext ? `.${ext}` : "";
  }
}
