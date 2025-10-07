-- =================================
-- SUPABASE DATABASE SETUP SCRIPT
-- =================================
-- Copy và paste đoạn SQL này vào Supabase SQL Editor

-- 1. Create comments table
CREATE TABLE public.comments (
    id SERIAL PRIMARY KEY,
    author VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    is_approved BOOLEAN DEFAULT true,
    
    -- Constraints để validate data
    CONSTRAINT check_author_length CHECK (char_length(author) >= 1 AND char_length(author) <= 100),
    CONSTRAINT check_content_length CHECK (char_length(content) >= 1 AND char_length(content) <= 1000)
);

-- 2. Create index for better performance
CREATE INDEX idx_comments_created_at ON public.comments(created_at DESC);
CREATE INDEX idx_comments_approved ON public.comments(is_approved);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 4. Create policies for public access
-- Policy: Anyone can view approved comments
CREATE POLICY "Anyone can view approved comments" ON public.comments
    FOR SELECT USING (is_approved = true);

-- Policy: Anyone can insert comments (will be approved by default)
CREATE POLICY "Anyone can insert comments" ON public.comments
    FOR INSERT WITH CHECK (true);

-- 5. Insert some sample data (optional)
INSERT INTO public.comments (author, content) VALUES 
('TechReviewer', 'Amazing portfolio! The design is really clean and professional.'),
('CodeMaster', 'Love the smooth animations and responsive design.'),
('UIDesigner', 'Great use of colors and typography. Very inspiring!'),
('Developer123', 'The About section with tabs is really well implemented.');

-- 6. Test query
SELECT id, author, content, created_at 
FROM public.comments 
WHERE is_approved = true 
ORDER BY created_at DESC;

-- =================================
-- CHẠY TỪNG PHẦN THEO THỨ TỰ
-- =================================