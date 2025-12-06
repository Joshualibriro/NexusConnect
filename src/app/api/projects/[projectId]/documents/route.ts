import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const UPLOAD_DIR = join(process.cwd(), 'public', 'documents');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;

    const documents = await query(
      'SELECT id, projectId, uploadedBy, fileName, fileSize, fileType, description, createdAt FROM documents WHERE projectId = ? ORDER BY createdAt DESC',
      [parseInt(projectId)]
    );

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    console.error('Get documents error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
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

    // Check if user is project member
    const members = await query(
      'SELECT id FROM project_members WHERE projectId = ? AND userId = ?',
      [parseInt(projectId), decoded.userId]
    ) as any[];

    if (members.length === 0) {
      return NextResponse.json(
        { error: 'You are not a member of this project' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${projectId}-${timestamp}-${file.name}`;
    const filepath = join(UPLOAD_DIR, filename);

    // Write file
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    // Save to database
    const result = await query(
      'INSERT INTO documents (projectId, uploadedBy, fileName, filePath, fileSize, fileType, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        parseInt(projectId),
        decoded.userId,
        file.name,
        `/documents/${filename}`,
        file.size,
        file.type,
        description || null,
      ]
    ) as any;

    return NextResponse.json(
      {
        message: 'Document uploaded successfully',
        documentId: result.insertId,
        url: `/documents/${filename}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload document error:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}
