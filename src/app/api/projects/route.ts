import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { projectSchema } from '@/lib/validation';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const projects = await query(
      'SELECT id, name, description, ownerId, status, category, budget, deadline, createdAt FROM projects ORDER BY createdAt DESC LIMIT 20'
    );

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    const result = await query(
      'INSERT INTO projects (name, description, ownerId, category, budget, deadline, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        validatedData.name,
        validatedData.description,
        decoded.userId,
        validatedData.category || null,
        validatedData.budget || null,
        validatedData.deadline || null,
        'open',
      ]
    ) as any;

    return NextResponse.json(
      { message: 'Project created successfully', projectId: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
