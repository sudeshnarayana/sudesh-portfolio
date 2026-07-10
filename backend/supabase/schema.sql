-- Create Supabase Schema for Portfolio Admin Dashboard

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profile Table
CREATE TABLE public.profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    professional_title TEXT,
    about_me TEXT,
    profile_image_url TEXT,
    cover_image_url TEXT,
    location TEXT,
    email TEXT,
    phone TEXT,
    personal_bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects Table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    technologies_used TEXT[], -- Array of strings
    github_url TEXT,
    live_demo_url TEXT,
    project_image_url TEXT,
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    publish_status BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Skills Table
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_name TEXT NOT NULL,
    category TEXT NOT NULL,
    skill_level INTEGER CHECK (skill_level >= 0 AND skill_level <= 100),
    icon TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Experience Table
CREATE TABLE public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    start_date DATE,
    end_date DATE, -- NULL means present
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Education Table
CREATE TABLE public.education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institute TEXT NOT NULL,
    qualification TEXT NOT NULL,
    duration TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Certificates Table
CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_name TEXT NOT NULL,
    organization TEXT NOT NULL,
    issue_date DATE,
    certificate_image_url TEXT,
    verification_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Services Table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Contact Messages Table
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Social Links Table
CREATE TABLE public.social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Settings Table
CREATE TABLE public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_title TEXT DEFAULT 'My Portfolio',
    seo_meta_title TEXT,
    seo_description TEXT,
    favicon_url TEXT,
    theme_settings JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-----------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-----------------------------------------

ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access
CREATE POLICY "Public Read Access" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.projects FOR SELECT USING (publish_status = true);
CREATE POLICY "Public Read Access" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON public.settings FOR SELECT USING (true);

-- Contact messages are NOT public read.
CREATE POLICY "Admin Read Contact Messages" ON public.contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Public Insert Contact Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- 2. Admin Write Access
CREATE POLICY "Admin Write Access" ON public.profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Access" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Access" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Access" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Access" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Access" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Access" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Access" ON public.contact_messages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Access" ON public.contact_messages FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Access" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Access" ON public.settings FOR ALL USING (auth.role() = 'authenticated');

-----------------------------------------
-- STORAGE BUCKETS
-----------------------------------------
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Admin Write Access" ON storage.objects FOR ALL USING (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');
