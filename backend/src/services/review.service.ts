import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/AppError.js";
import { validateCreateReview } from "../validators/review.validator.js";

export async function createReview(input: unknown) {
  const data = validateCreateReview(input);

  try {
    return await prisma.reviews.create({ data });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw new AppError("A review with this email already exists", 409);
    }
    throw err;
  }
}
