import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;

    const members = await query(
      `SELECT pm.id, pm.userId, pm.role, pm.joinedAt, u.firstName, u.lastName, u.email, u.profilePicture, u.title
       FROM project_members pm
       JOIN users u ON pm.userId = u.id
       WHERE pm.projectId = ?
       ORDER BY pm.joinedAt ASC`,
      [parseInt(projectId)]
    );

    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error('Get members error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
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
    const { userId, role } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if project owner
    const projects = await query(
      'SELECT id FROM projects WHERE id = ? AND ownerId = ?',
      [parseInt(projectId), decoded.userId]
    ) as any[];

    if (projects.length === 0) {
      return NextResponse.json(
        { error: 'Only project owner can add members' },
        { status: 403 }
      );
    }

    // Check if already member
    const existing = await query(
      'SELECT id FROM project_members WHERE projectId = ? AND userId = ?',
      [parseInt(projectId), userId]
    ) as any[];

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'User is already a member' },
        { status: 400 }
      );
    }

    await query(
      'INSERT INTO project_members (projectId, userId, role) VALUES (?, ?, ?)',
      [parseInt(projectId), userId, role || 'member']
    );

    return NextResponse.json(
      { message: 'Member added successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Add member error:', error);
    return NextResponse.json(
      { error: 'Failed to add member' },
      { status: 500 }
    );
  }
}
