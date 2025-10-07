-- =================================
-- CONTACT FORM DATABASE SETUP
-- =================================
-- Chạy đoạn SQL này trong Supabase SQL Editor
ALTER TABLE public.contacts DISABLE ROW LEVEL SECURITY;
-- 1. Create contacts table
CREATE TABLE public.contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    is_read BOOLEAN DEFAULT false,
    
    -- Constraints để validate data
    CONSTRAINT check_name_length CHECK (char_length(name) >= 1 AND char_length(name) <= 100),
    CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT check_subject_length CHECK (char_length(subject) >= 1 AND char_length(subject) <= 200),
    CONSTRAINT check_message_length CHECK (char_length(message) >= 1 AND char_length(message) <= 2000)
);

-- 2. Create indexes for better performance
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX idx_contacts_email ON public.contacts(email);
CREATE INDEX idx_contacts_is_read ON public.contacts(is_read);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 4. Create policy for public insert (anyone can submit contact form)
CREATE POLICY "Anyone can insert contacts" ON public.contacts
    FOR INSERT WITH CHECK (true);

-- 5. Only authenticated users can view contacts (for admin panel later)
-- CREATE POLICY "Admin can view contacts" ON public.contacts
--     FOR SELECT USING (auth.role() = 'authenticated');

-- 6. Test query to verify table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'contacts' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- =================================
-- CHẠY SCRIPT NÀY TRONG SUPABASE
-- =================================