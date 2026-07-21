import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";
import { ReviewResponseDto, toReviewResponseDto } from "../dto/review/review-response.dto.js";
import { validateCreateReview, validateGetReviewParams } from "../validators/review.validator.js";

export async function createReview(input: unknown): Promise<ReviewResponseDto> {
  const data = validateCreateReview(input);

  try {
    const review = await prisma.reviews.create({ data });
    return toReviewResponseDto(review);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw new AppError("A review with this email already exists", 409);
    }
    throw err;
  }
}

export async function fetchReview(params: unknown): Promise<ReviewResponseDto> {
  const { id } = validateGetReviewParams(params);

  const review = await prisma.reviews.findUnique({ where: { id } });

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  return toReviewResponseDto(review);
}
