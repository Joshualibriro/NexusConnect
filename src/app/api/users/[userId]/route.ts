import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { updateProfileSchema } from '@/lib/validation';
import { ZodError } from 'zod';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const users = await query(
      'SELECT id, email, firstName, lastName, title, bio, profilePicture, location, skills, createdAt FROM users WHERE id = ?',
      [parseInt(userId)]
    ) as any[];

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(users[0], { status: 200 });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded || decoded.userId !== parseInt(userId)) {
      return NextResponse.json(
        { error: 'Unauthorized - Cannot update other users' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    await query(
      'UPDATE users SET firstName = ?, lastName = ?, title = ?, bio = ?, location = ?, skills = ? WHERE id = ?',
      [
        validatedData.firstName,
        validatedData.lastName,
        validatedData.title || null,
        validatedData.bio || null,
        validatedData.location || null,
        validatedData.skills || null,
        parseInt(userId),
      ]
    );

    return NextResponse.json(
      { message: 'Profile updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
