import { Prisma } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const foods = await prisma.food.findMany();
  return NextResponse.json(foods);
};
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  // Шалгалт: Ангиллын нэр ирээгүй бол алдаа буцаана
  if (!body.categoryName) {
    return NextResponse.json(
      { error: "categoryName заавал шаардлагатай!" },
      { status: 400 },
    );
  }
  // Шинэ ангилал үүсгэх
  const newCategory = await prisma.foodCategory.create({
    data: {
      categoryName: body.categoryName, // Утгыг нь ингэж зааж өгнө
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
};
