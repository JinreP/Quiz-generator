import { query } from "@/lib/connectDb";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await prisma.employees.findMany();
  return NextResponse.json(res);
};

export const POST = async (req: Request) => {
  const now = new Date();

  try {
    const employee = await prisma.employees.create({
      data: {
        firstname: "Galzuu",
        lastname: "Max",
        gender: "Male",
        departmentid: 2,
        age: 15,
        hiredate: now,
        position: "Engineering",
      },
    });
    console.log("RESPONSE!", employee);

    return NextResponse.json(employee);
  } catch (error) {
    console.error(error, "post error");
  }
};

export const DELETE = async (req: Request) => {
  try {
    const employee = await prisma.employees.delete({
      where: {
        id: 9,
      },
    });
    return NextResponse.json(employee);
  } catch (error) {
    console.error(error, "failed to delete");
  }
};

export const PATCH = async (req: Request) => {
  try {
    const employee = await prisma.employees.update({
      where: {
        id: 10,
      },
      data: {
        firstname: "Viola the Magnificent",
      },
    });

    return NextResponse.json(employee);
    console.log(employee);
  } catch (error) {
    console.error(error, "failed to updade");
  }
};
