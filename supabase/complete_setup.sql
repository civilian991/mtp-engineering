-- MTP Engineering Database Setup
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    icon VARCHAR(100),
    image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    client_en VARCHAR(255),
    client_ar VARCHAR(255),
    location_en VARCHAR(255),
    location_ar VARCHAR(255),
    sector VARCHAR(100),
    status VARCHAR(50) DEFAULT 'completed',
    year INTEGER,
    value DECIMAL(12, 2),
    image_url TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    position_en VARCHAR(255),
    position_ar VARCHAR(255),
    bio_en TEXT,
    bio_ar TEXT,
    image_url TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create careers table
CREATE TABLE IF NOT EXISTS careers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    department_en VARCHAR(255),
    department_ar VARCHAR(255),
    location_en VARCHAR(255),
    location_ar VARCHAR(255),
    type VARCHAR(50),
    experience_level VARCHAR(50),
    description_en TEXT,
    description_ar TEXT,
    requirements_en TEXT,
    requirements_ar TEXT,
    responsibilities_en TEXT,
    responsibilities_ar TEXT,
    benefits_en TEXT,
    benefits_ar TEXT,
    is_active BOOLEAN DEFAULT true,
    posted_date DATE DEFAULT CURRENT_DATE,
    closing_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    content_en TEXT,
    content_ar TEXT,
    excerpt_en TEXT,
    excerpt_ar TEXT,
    author VARCHAR(255),
    category VARCHAR(100),
    tags JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    is_published BOOLEAN DEFAULT false,
    published_date DATE,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    response TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    career_id UUID REFERENCES careers(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    cv_url TEXT,
    cover_letter TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    years_of_experience INTEGER,
    current_position VARCHAR(255),
    current_company VARCHAR(255),
    expected_salary VARCHAR(100),
    notice_period VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sectors table
CREATE TABLE IF NOT EXISTS sectors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    icon VARCHAR(100),
    image_url TEXT,
    projects_count INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create company_info table
CREATE TABLE IF NOT EXISTS company_info (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value_en TEXT,
    value_ar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert MTP Services
INSERT INTO services (name_en, name_ar, description_en, description_ar, icon, sort_order) VALUES
('Electrical Installation', 'التركيبات الكهربائية',
 'H.V. and M.V. switch gears, power stations, electrical installations, M.V. cables laying and termination, L.V. power and distribution boards, lighting and small power systems',
 'المفاتيح الكهربائية عالية ومتوسطة الجهد، محطات الطاقة، التركيبات الكهربائية، مد وإنهاء كابلات الجهد المتوسط، لوحات الطاقة والتوزيع منخفضة الجهد، أنظمة الإضاءة والطاقة الصغيرة',
 'zap', 1),

('HVAC Systems', 'أنظمة التكييف والتهوية',
 'Complete heating, ventilating and air conditioning systems including chillers, air handling units, ducting, and controls',
 'أنظمة التدفئة والتهوية والتكييف الكاملة بما في ذلك المبردات ووحدات معالجة الهواء والقنوات وأنظمة التحكم',
 'wind', 2),

('Plumbing & Sanitary', 'السباكة والصرف الصحي',
 'Sanitary fixtures, water supply systems, drainage and sewer systems, irrigation and storm water systems',
 'الأدوات الصحية وأنظمة إمدادات المياه وأنظمة الصرف الصحي وأنظمة الري ومياه الأمطار',
 'droplet', 3),

('Fire Fighting Systems', 'أنظمة مكافحة الحريق',
 'Sprinkler systems, fire hose cabinets, fire pumps, fire extinguishers, fire alarm systems, CO2 and FM200 systems',
 'أنظمة الرشاشات، خزائن خراطيم الحريق، مضخات الحريق، طفايات الحريق، أنظمة إنذار الحريق، أنظمة CO2 و FM200',
 'flame', 4),

('Low Current Systems', 'أنظمة التيار المنخفض',
 'CCTV and security systems, master antenna and CATV, audio/video intercom systems, telephone and PABX systems, data networks and IT infrastructure',
 'أنظمة المراقبة والأمن، الهوائي الرئيسي والتلفزيون الكبلي، أنظمة الاتصال الداخلي الصوتي/المرئي، أنظمة الهاتف و PABX، شبكات البيانات والبنية التحتية لتكنولوجيا المعلومات',
 'wifi', 5),

('Project Management', 'إدارة المشاريع',
 'Complete MEP project management, construction supervision, testing and commissioning, maintenance services',
 'إدارة مشاريع MEP الكاملة، الإشراف على البناء، الاختبار والتشغيل، خدمات الصيانة',
 'clipboard-check', 6);

-- Insert MTP Projects
INSERT INTO projects (name_en, name_ar, client_en, client_ar, location_en, location_ar, sector, year, status, is_featured) VALUES
('Jeddah Islamic Port', 'ميناء جدة الإسلامي',
 'Saudi Ports Authority', 'الهيئة العامة للموانئ',
 'Jeddah', 'جدة',
 'transportation', 2018, 'completed', true),

('King Fahd Medical City', 'مدينة الملك فهد الطبية',
 'Ministry of Health', 'وزارة الصحة',
 'Riyadh', 'الرياض',
 'healthcare', 2019, 'completed', true),

('ARAMCO Residential Complex', 'مجمع أرامكو السكني',
 'Saudi ARAMCO', 'أرامكو السعودية',
 'Dhahran', 'الظهران',
 'oil-gas', 2020, 'completed', true),

('King Abdulaziz International Airport', 'مطار الملك عبدالعزيز الدولي',
 'GACA', 'الهيئة العامة للطيران المدني',
 'Jeddah', 'جدة',
 'transportation', 2021, 'completed', true),

('Ministry of Interior Building', 'مبنى وزارة الداخلية',
 'Ministry of Interior', 'وزارة الداخلية',
 'Riyadh', 'الرياض',
 'government', 2020, 'completed', false),

('Al Faisaliah Hotel', 'فندق الفيصلية',
 'Al Faisaliah Group', 'مجموعة الفيصلية',
 'Riyadh', 'الرياض',
 'commercial', 2017, 'completed', false),

('King Saud University', 'جامعة الملك سعود',
 'Ministry of Education', 'وزارة التعليم',
 'Riyadh', 'الرياض',
 'education', 2018, 'completed', false),

('Madinah-Makkah High Speed Rail', 'قطار الحرمين السريع',
 'Saudi Railway Organization', 'المؤسسة العامة للخطوط الحديدية',
 'Madinah-Makkah', 'المدينة المنورة-مكة المكرمة',
 'transportation', 2019, 'completed', true),

('SABIC Industrial Complex', 'مجمع سابك الصناعي',
 'SABIC', 'سابك',
 'Jubail', 'الجبيل',
 'industrial', 2021, 'completed', false),

('National Guard Hospital', 'مستشفى الحرس الوطني',
 'Ministry of National Guard', 'وزارة الحرس الوطني',
 'Jeddah', 'جدة',
 'healthcare', 2022, 'completed', false),

('Jeddah Desalination Plant', 'محطة تحلية جدة',
 'SWCC', 'المؤسسة العامة لتحلية المياه المالحة',
 'Jeddah', 'جدة',
 'utilities', 2020, 'completed', false),

('King Abdullah Financial District', 'مركز الملك عبدالله المالي',
 'Public Investment Fund', 'صندوق الاستثمارات العامة',
 'Riyadh', 'الرياض',
 'commercial', 2023, 'ongoing', true),

('Red Sea Mall Expansion', 'توسعة الرد سي مول',
 'Arabian Centers', 'المراكز العربية',
 'Jeddah', 'جدة',
 'commercial', 2023, 'ongoing', false);

-- Insert Company Information
INSERT INTO company_info (key, value_en, value_ar) VALUES
('address', 'P.O. Box 7531, Jeddah 21462, Saudi Arabia', 'ص.ب 7531، جدة 21462، المملكة العربية السعودية'),
('phone', '+966 2 653 4098', '+966 2 653 4098'),
('fax', '+966 2 653 1548', '+966 2 653 1548'),
('email', 'info@mtpksa.com', 'info@mtpksa.com'),
('registration', 'CR No: 4030054738', 'س.ت: 4030054738'),
('classification', 'Special Grade Electro-Mechanical Contractor', 'مقاول كهروميكانيكي درجة خاصة'),
('established', '1980', '1980'),
('employees', '180+', '180+'),
('projects_completed', '100+', '100+'),
('years_experience', '44+', '44+');

-- Create indexes for better performance
CREATE INDEX idx_projects_sector ON projects(sector);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_year ON projects(year);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_careers_active ON careers(is_active);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_news_published ON news(is_published);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON careers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sectors_updated_at BEFORE UPDATE ON sectors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_info_updated_at BEFORE UPDATE ON company_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

-- Create public read policies
CREATE POLICY "Public can view services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can view team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view careers" ON careers FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published news" ON news FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view sectors" ON sectors FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view company info" ON company_info FOR SELECT USING (true);

-- Create public insert policies for forms
CREATE POLICY "Public can create inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can apply for jobs" ON job_applications FOR INSERT WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON services TO anon;
GRANT SELECT ON projects TO anon;
GRANT SELECT ON team_members TO anon;
GRANT SELECT ON careers TO anon;
GRANT SELECT ON news TO anon;
GRANT SELECT ON sectors TO anon;
GRANT SELECT ON company_info TO anon;
GRANT INSERT ON inquiries TO anon;
GRANT INSERT ON job_applications TO anon;

-- Success message
SELECT 'Database setup completed successfully!' as message;