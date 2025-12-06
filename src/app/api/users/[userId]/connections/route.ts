import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const connections = await query(
      `SELECT c.id, c.userId, c.connectedUserId, c.status, u.firstName, u.lastName, u.email, u.profilePicture, u.title
       FROM connections c
       JOIN users u ON c.connectedUserId = u.id
       WHERE c.userId = ? AND c.status = 'connected'`,
      [parseInt(userId)]
    );

    return NextResponse.json(connections, { status: 200 });
  } catch (error) {
    console.error('Get connections error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch connections' },
      { status: 500 }
    );
  }
}

export async function POST(
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

    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    if (decoded.userId === parseInt(userId)) {
      return NextResponse.json(
        { error: 'Cannot connect with yourself' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { action } = body; // 'connect', 'accept', 'remove'

    if (action === 'connect') {
      // Check if already connected or pending
      const existing = await query(
        'SELECT id, status FROM connections WHERE (userId = ? AND connectedUserId = ?) OR (userId = ? AND connectedUserId = ?)',
        [decoded.userId, parseInt(userId), parseInt(userId), decoded.userId]
      ) as any[];

      if (existing.length > 0) {
        return NextResponse.json(
          { error: 'Connection already exists' },
          { status: 400 }
        );
      }

      await query(
        'INSERT INTO connections (userId, connectedUserId, status) VALUES (?, ?, ?)',
        [decoded.userId, parseInt(userId), 'pending']
      );
    } else if (action === 'accept') {
      await query(
        'UPDATE connections SET status = ? WHERE userId = ? AND connectedUserId = ? AND status = ?',
        ['connected', parseInt(userId), decoded.userId, 'pending']
      );
    } else if (action === 'remove') {
      await query(
        'DELETE FROM connections WHERE (userId = ? AND connectedUserId = ?) OR (userId = ? AND connectedUserId = ?)',
        [decoded.userId, parseInt(userId), parseInt(userId), decoded.userId]
      );
    }

    return NextResponse.json(
      { message: `Connection ${action}ed successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json(
      { error: 'Failed to process connection' },
      { status: 500 }
    );
  }
}
