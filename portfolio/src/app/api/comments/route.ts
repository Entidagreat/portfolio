import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Comment {
  id: number;
  author: string;
  content: string;
  created_at: string;
  ip_address?: string;
  is_approved?: boolean;
}

// GET - Fetch all approved comments
export async function GET() {
  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('id, author, content, created_at')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Format timestamps for frontend
    const formattedComments = comments?.map((comment: any) => ({
      ...comment,
      timestamp: new Date(comment.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }));

    return NextResponse.json({
      success: true,
      data: formattedComments || [],
      total: formattedComments?.length || 0
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST - Create new comment
export async function POST(request: NextRequest) {
  try {
    const { author, content } = await request.json();
    
    // Validation
    if (!author || !content) {
      return NextResponse.json(
        { success: false, error: 'Author and content are required' },
        { status: 400 }
      );
    }
    
    if (author.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Author name too long (max 100 characters)' },
        { status: 400 }
      );
    }
    
    if (content.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Content too long (max 1000 characters)' },
        { status: 400 }
      );
    }
    
    // Get client IP for spam prevention
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    
    // Insert comment into database
    const { data: newComment, error } = await supabase
      .from('comments')
      .insert([
        {
          author: author.trim(),
          content: content.trim(),
          ip_address: clientIP,
          is_approved: true // Auto-approve for now, can add moderation later
        }
      ])
      .select('id, author, content, created_at')
      .single();
    
    if (error) {
      throw error;
    }
    
    // Format timestamp for response
    const formattedComment = {
      ...newComment,
      timestamp: new Date(newComment.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    };
    
    return NextResponse.json({
      success: true,
      data: formattedComment,
      message: 'Comment posted successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}