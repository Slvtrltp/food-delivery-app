import { Prisma } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const foods = await prisma.food.findMany();
  return NextResponse.json(foods);
};
export const POST = async (req: NextRequest) => {
  const foods: Prisma.FoodCreateInput = await req.json();
  const newFood = await prisma.food.create({ data: foods });
  return NextResponse.json(newFood);
};
