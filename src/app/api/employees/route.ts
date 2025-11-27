import { query } from "@/lib/connectDb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await query("SELECT * FROM employees");
    console.log("RESPONSE!", res);

    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(error, "get error");
  }
};

export const POST = async (req: Request) => {
  try {
    const body = req.json();
    const res = await query(
      `INSERT INTO employees 
      (id,firstname, lastname, age, gender, position, hireDate, departmentId) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) `,
      ["12", "Mofioso", "Ganbat", "19", "Male", "Bavuulah", "2006.09.11", "2"]
    );

    console.log("RESPONSE!", res);

    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(error, "get error");
  }
};
