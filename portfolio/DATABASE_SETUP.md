# Database Setup Guide

## Option 1: Supabase (Recommended)

### 1. Create Supabase Project
```bash
# Install Supabase CLI
npm install -g supabase

# Login and create project
supabase login
supabase init
```

### 2. Database Schema
```sql
-- Create comments table
CREATE TABLE public.comments (
    id SERIAL PRIMARY KEY,
    author VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    is_approved BOOLEAN DEFAULT true,
    
    -- Constraints
    CONSTRAINT check_author_length CHECK (char_length(author) >= 1),
    CONSTRAINT check_content_length CHECK (char_length(content) >= 1)
);

-- Create index for better performance
CREATE INDEX idx_comments_created_at ON public.comments(created_at DESC);

-- Row Level Security (Optional)
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Policy to allow everyone to read comments
CREATE POLICY "Anyone can view comments" ON public.comments
    FOR SELECT USING (is_approved = true);

-- Policy to allow anyone to insert comments
CREATE POLICY "Anyone can insert comments" ON public.comments
    FOR INSERT WITH CHECK (true);
```

### 3. Environment Variables
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # For admin operations
```

### 4. Install Dependencies
```bash
npm install @supabase/supabase-js
```

## Option 2: Local SQLite (Development)

### 1. Install Dependencies
```bash
npm install sqlite3 @types/sqlite3
```

### 2. Database Setup
```sql
-- schema.sql
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL CHECK(length(author) > 0 AND length(author) <= 100),
    content TEXT NOT NULL CHECK(length(content) > 0 AND length(content) <= 1000),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    is_approved BOOLEAN DEFAULT 1
);

CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
```

## Option 3: PlanetScale (MySQL)

### 1. Create Database
```bash
# Install PlanetScale CLI
# Create database and get connection string
```

### 2. Schema
```sql
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    is_approved BOOLEAN DEFAULT TRUE,
    
    INDEX idx_created_at (created_at DESC)
);
```