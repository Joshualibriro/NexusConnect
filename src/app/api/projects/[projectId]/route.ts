import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;

    const projects = await query(
      'SELECT id, name, description, ownerId, status, category, budget, deadline, createdAt FROM projects WHERE id = ?',
      [parseInt(projectId)]
    ) as any[];

    if (projects.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(projects[0], { status: 200 });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is project owner
    const projects = await query(
      'SELECT id FROM projects WHERE id = ? AND ownerId = ?',
      [parseInt(projectId), decoded.userId]
    ) as any[];

    if (projects.length === 0) {
      return NextResponse.json(
        { error: 'Unauthorized - Only project owner can update' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { status, name, description } = body;

    await query(
      'UPDATE projects SET status = ?, name = ?, description = ? WHERE id = ?',
      [status || 'open', name, description, parseInt(projectId)]
    );

    return NextResponse.json(
      { message: 'Project updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is project owner
    const projects = await query(
      'SELECT id FROM projects WHERE id = ? AND ownerId = ?',
      [parseInt(projectId), decoded.userId]
    ) as any[];

    if (projects.length === 0) {
      return NextResponse.json(
        { error: 'Unauthorized - Only project owner can delete' },
        { status: 403 }
      );
    }

    await query('DELETE FROM projects WHERE id = ?', [parseInt(projectId)]);

    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
