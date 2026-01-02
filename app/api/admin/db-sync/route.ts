import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  try {
    // This command tells Prisma to push the schema to Neon
    // We use --accept-data-loss because it's a new DB
    const output = execSync("npx prisma db push --accept-data-loss").toString();
    
    return NextResponse.json({ 
      success: true, 
      message: "Database schema synced successfully", 
      details: output 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stderr: error.stderr?.toString()
    }, { status: 500 });
  }
}
