import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// POST - Submit contact form
export async function POST(request: NextRequest) {
  console.log('=== Contact API Called ===');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const { name, email, subject, message }: ContactSubmission = body;
    
    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate field lengths
    if (name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name too long (max 100 characters)' },
        { status: 400 }
      );
    }
    
    if (email.length > 255) {
      return NextResponse.json(
        { success: false, error: 'Email too long (max 255 characters)' },
        { status: 400 }
      );
    }
    
    if (subject.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Subject too long (max 200 characters)' },
        { status: 400 }
      );
    }
    
    if (message.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Message too long (max 2000 characters)' },
        { status: 400 }
      );
    }
    
    // Email format validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Get client IP for spam prevention
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    
    // Insert contact submission into database
    console.log('Inserting into Supabase...');
    const { data: newContact, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          subject: subject.trim(),
          message: message.trim(),
          ip_address: clientIP,
          is_read: false
        }
      ])
      .select('id, name, email, subject, created_at')
      .single();
    
    if (error) {
      console.error('❌ Supabase error:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }
    
    console.log('✅ Insert successful:', newContact);
    
    // Log successful submission
    console.log(`New contact submission from ${email}: ${subject}`);
    
    return NextResponse.json({
      success: true,
      data: {
        id: newContact.id,
        message: 'Thank you for your message! I will get back to you soon.'
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
}

// GET - Retrieve contact submissions (for admin panel later)
export async function GET(request: NextRequest) {
  try {
    // This could be protected with authentication in the future
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('id, name, email, subject, message, created_at, is_read')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: contacts || [],
      total: contacts?.length || 0
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}