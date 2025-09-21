-- MTP Engineering Seed Data
-- Migration: 003_seed_data
-- Date: 2025-09-21
-- Description: Initial seed data for testing and development

-- ============================================
-- SERVICES SEED DATA
-- ============================================
INSERT INTO services (slug, name_en, name_ar, description_en, description_ar, short_description_en, short_description_ar, icon, sort_order, is_active) VALUES
('civil-engineering', 'Civil Engineering', 'الهندسة المدنية',
 'Comprehensive civil engineering solutions including structural design, infrastructure development, and construction management for projects of all scales.',
 'حلول هندسية مدنية شاملة تشمل التصميم الإنشائي وتطوير البنية التحتية وإدارة البناء لمشاريع بجميع الأحجام.',
 'Expert civil engineering for infrastructure and construction',
 'هندسة مدنية متخصصة للبنية التحتية والبناء',
 'building', 1, true),

('electrical-systems', 'Electrical Systems', 'الأنظمة الكهربائية',
 'Design and implementation of electrical systems including power distribution, lighting, emergency systems, and energy management solutions.',
 'تصميم وتنفيذ الأنظمة الكهربائية بما في ذلك توزيع الطاقة والإضاءة وأنظمة الطوارئ وحلول إدارة الطاقة.',
 'Advanced electrical systems and power solutions',
 'أنظمة كهربائية متقدمة وحلول الطاقة',
 'lightning-bolt', 2, true),

('mechanical-engineering', 'Mechanical Engineering', 'الهندسة الميكانيكية',
 'HVAC systems, plumbing, fire protection, and mechanical system design for optimal building performance and occupant comfort.',
 'أنظمة التدفئة والتهوية وتكييف الهواء والسباكة والحماية من الحرائق وتصميم الأنظمة الميكانيكية للأداء الأمثل للمباني وراحة الساكنين.',
 'HVAC and mechanical systems expertise',
 'خبرة في أنظمة التكييف والأنظمة الميكانيكية',
 'cog', 3, true),

('project-management', 'Project Management', 'إدارة المشاريع',
 'End-to-end project management services ensuring timely delivery, budget control, and quality assurance throughout the project lifecycle.',
 'خدمات إدارة المشاريع الشاملة لضمان التسليم في الوقت المحدد والتحكم في الميزانية وضمان الجودة طوال دورة حياة المشروع.',
 'Professional project management and coordination',
 'إدارة مشاريع احترافية وتنسيق',
 'clipboard-check', 4, true),

('architectural-design', 'Architectural Design', 'التصميم المعماري',
 'Innovative architectural design services blending functionality with aesthetics, creating spaces that inspire and endure.',
 'خدمات التصميم المعماري المبتكرة التي تمزج بين الوظيفة والجمال، وخلق مساحات ملهمة ودائمة.',
 'Creative architectural solutions',
 'حلول معمارية إبداعية',
 'home', 5, true),

('consultation-services', 'Consultation Services', 'الخدمات الاستشارية',
 'Expert engineering consultation for feasibility studies, technical assessments, and strategic planning for complex projects.',
 'استشارات هندسية متخصصة لدراسات الجدوى والتقييمات الفنية والتخطيط الاستراتيجي للمشاريع المعقدة.',
 'Expert engineering consultation',
 'استشارات هندسية متخصصة',
 'user-group', 6, true);

-- ============================================
-- SECTORS SEED DATA
-- ============================================
INSERT INTO sectors (slug, name_en, name_ar, description_en, description_ar, icon, sort_order, is_active) VALUES
('commercial', 'Commercial', 'تجاري',
 'Shopping malls, office buildings, retail spaces, and mixed-use developments',
 'مراكز التسوق والمباني المكتبية والمساحات التجارية والتطويرات متعددة الاستخدامات',
 'building-office', 1, true),

('residential', 'Residential', 'سكني',
 'Luxury villas, residential compounds, apartment complexes, and housing projects',
 'الفلل الفاخرة والمجمعات السكنية ومجمعات الشقق ومشاريع الإسكان',
 'home', 2, true),

('industrial', 'Industrial', 'صناعي',
 'Factories, warehouses, logistics centers, and industrial facilities',
 'المصانع والمستودعات ومراكز الخدمات اللوجستية والمنشآت الصناعية',
 'factory', 3, true),

('healthcare', 'Healthcare', 'الرعاية الصحية',
 'Hospitals, medical centers, clinics, and specialized healthcare facilities',
 'المستشفيات والمراكز الطبية والعيادات ومرافق الرعاية الصحية المتخصصة',
 'hospital', 4, true),

('education', 'Education', 'التعليم',
 'Schools, universities, training centers, and educational facilities',
 'المدارس والجامعات ومراكز التدريب والمرافق التعليمية',
 'academic-cap', 5, true),

('hospitality', 'Hospitality', 'الضيافة',
 'Hotels, resorts, restaurants, and entertainment venues',
 'الفنادق والمنتجعات والمطاعم وأماكن الترفيه',
 'hotel', 6, true),

('infrastructure', 'Infrastructure', 'البنية التحتية',
 'Roads, bridges, utilities, and public infrastructure projects',
 'الطرق والجسور والمرافق ومشاريع البنية التحتية العامة',
 'road', 7, true),

('government', 'Government', 'حكومي',
 'Government buildings, public facilities, and civic projects',
 'المباني الحكومية والمرافق العامة والمشاريع المدنية',
 'landmark', 8, true);

-- ============================================
-- SAMPLE PROJECTS SEED DATA
-- ============================================
INSERT INTO projects (
  slug, project_code, name_en, name_ar,
  client_name_en, client_name_ar,
  description_en, description_ar,
  city_en, city_ar, country, year,
  status, is_featured, is_published
) VALUES
('king-abdulaziz-medical-city', 'KAMC-2024-001',
 'King Abdulaziz Medical City Expansion', 'توسعة مدينة الملك عبدالعزيز الطبية',
 'Ministry of Health', 'وزارة الصحة',
 'Major expansion project for King Abdulaziz Medical City including new surgical towers, diagnostic centers, and patient care facilities.',
 'مشروع توسعة كبير لمدينة الملك عبدالعزيز الطبية يشمل أبراج جراحية جديدة ومراكز تشخيص ومرافق رعاية المرضى.',
 'Riyadh', 'الرياض', 'SA', 2024,
 'ongoing', true, true),

('neom-residential-complex', 'NEOM-2024-002',
 'NEOM Residential Complex Phase 1', 'مجمع نيوم السكني المرحلة الأولى',
 'NEOM Company', 'شركة نيوم',
 'Sustainable residential complex featuring smart home technology, renewable energy systems, and innovative architectural design.',
 'مجمع سكني مستدام يتميز بتقنية المنزل الذكي وأنظمة الطاقة المتجددة والتصميم المعماري المبتكر.',
 'NEOM', 'نيوم', 'SA', 2024,
 'planning', true, true),

('red-sea-resort', 'RSP-2023-001',
 'Red Sea Luxury Resort Development', 'تطوير منتجع البحر الأحمر الفاخر',
 'Red Sea Global', 'البحر الأحمر العالمية',
 'Luxury beachfront resort with 200 villas, marina facilities, and world-class amenities designed for sustainable tourism.',
 'منتجع فاخر على شاطئ البحر مع 200 فيلا ومرافق مارينا ووسائل راحة عالمية المستوى مصممة للسياحة المستدامة.',
 'Red Sea', 'البحر الأحمر', 'SA', 2023,
 'completed', true, true),

('jeddah-tower-mall', 'JTM-2023-002',
 'Jeddah Tower Mall', 'مول برج جدة',
 'Jeddah Economic Company', 'شركة جدة الاقتصادية',
 'Ultra-modern shopping and entertainment complex integrated with Jeddah Tower, featuring 500+ retail outlets and entertainment zones.',
 'مجمع تسوق وترفيه فائق الحداثة متكامل مع برج جدة، يضم أكثر من 500 منفذ بيع بالتجزئة ومناطق ترفيه.',
 'Jeddah', 'جدة', 'SA', 2023,
 'completed', true, true),

('aramco-headquarters', 'ARAMCO-2022-001',
 'Saudi Aramco Regional Headquarters', 'المقر الإقليمي لأرامكو السعودية',
 'Saudi Aramco', 'أرامكو السعودية',
 'State-of-the-art corporate headquarters featuring sustainable design, advanced technology infrastructure, and collaborative workspaces.',
 'مقر الشركة الحديث يتميز بالتصميم المستدام والبنية التحتية التقنية المتقدمة ومساحات العمل التعاونية.',
 'Dhahran', 'الظهران', 'SA', 2022,
 'completed', false, true);

-- ============================================
-- LINK PROJECTS TO SERVICES
-- ============================================
INSERT INTO project_services (project_id, service_id, is_primary)
SELECT
  p.id,
  s.id,
  CASE WHEN random() < 0.3 THEN true ELSE false END
FROM projects p
CROSS JOIN services s
WHERE random() < 0.5; -- Randomly assign ~50% of services to each project

-- ============================================
-- LINK PROJECTS TO SECTORS
-- ============================================
INSERT INTO project_sectors (project_id, sector_id, is_primary)
VALUES
  ((SELECT id FROM projects WHERE slug = 'king-abdulaziz-medical-city'), (SELECT id FROM sectors WHERE slug = 'healthcare'), true),
  ((SELECT id FROM projects WHERE slug = 'neom-residential-complex'), (SELECT id FROM sectors WHERE slug = 'residential'), true),
  ((SELECT id FROM projects WHERE slug = 'red-sea-resort'), (SELECT id FROM sectors WHERE slug = 'hospitality'), true),
  ((SELECT id FROM projects WHERE slug = 'jeddah-tower-mall'), (SELECT id FROM sectors WHERE slug = 'commercial'), true),
  ((SELECT id FROM projects WHERE slug = 'aramco-headquarters'), (SELECT id FROM sectors WHERE slug = 'commercial'), true);

-- ============================================
-- SAMPLE TEAM MEMBERS
-- ============================================
INSERT INTO team_members (
  employee_id, name_en, name_ar, position_en, position_ar,
  department_en, department_ar, years_experience,
  is_active, is_management, show_on_website
) VALUES
('EMP001', 'Ahmed Al-Rasheed', 'أحمد الرشيد',
 'Chief Executive Officer', 'الرئيس التنفيذي',
 'Executive', 'الإدارة التنفيذية', 25,
 true, true, true),

('EMP002', 'Sarah Johnson', 'سارة جونسون',
 'Chief Technical Officer', 'المدير الفني',
 'Engineering', 'الهندسة', 20,
 true, true, true),

('EMP003', 'Mohammed Al-Zahrani', 'محمد الزهراني',
 'Head of Civil Engineering', 'رئيس الهندسة المدنية',
 'Civil Engineering', 'الهندسة المدنية', 18,
 true, true, true),

('EMP004', 'Fatima Al-Harbi', 'فاطمة الحربي',
 'Senior Project Manager', 'مدير مشروع أول',
 'Project Management', 'إدارة المشاريع', 15,
 true, false, true),

('EMP005', 'John Smith', 'جون سميث',
 'Lead Electrical Engineer', 'مهندس كهربائي رئيسي',
 'Electrical Engineering', 'الهندسة الكهربائية', 12,
 true, false, true);

-- ============================================
-- SAMPLE CAREERS
-- ============================================
INSERT INTO careers (
  job_code, title_en, title_ar, department_en, department_ar,
  location_en, location_ar, employment_type, experience_level,
  description_en, description_ar, positions_available, is_active
) VALUES
('CE-2025-001', 'Senior Civil Engineer', 'مهندس مدني أول',
 'Civil Engineering', 'الهندسة المدنية',
 'Riyadh', 'الرياض', 'full-time', 'senior',
 'We are seeking an experienced Civil Engineer to lead major infrastructure projects.',
 'نبحث عن مهندس مدني ذو خبرة لقيادة مشاريع البنية التحتية الكبرى.',
 2, true),

('PM-2025-002', 'Project Manager', 'مدير مشروع',
 'Project Management', 'إدارة المشاريع',
 'Jeddah', 'جدة', 'full-time', 'mid',
 'Join our team as a Project Manager to oversee construction projects from inception to completion.',
 'انضم إلى فريقنا كمدير مشروع للإشراف على مشاريع البناء من البداية حتى الإنجاز.',
 3, true),

('EE-2025-003', 'Electrical Design Engineer', 'مهندس تصميم كهربائي',
 'Electrical Engineering', 'الهندسة الكهربائية',
 'Dammam', 'الدمام', 'full-time', 'junior',
 'Exciting opportunity for an Electrical Design Engineer to work on innovative projects.',
 'فرصة مثيرة لمهندس تصميم كهربائي للعمل على مشاريع مبتكرة.',
 5, true);

-- ============================================
-- SITE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value, category, is_public) VALUES
('company_email', '"info@mtp.com.sa"', 'contact', true),
('company_phone', '"+966 11 123 4567"', 'contact', true),
('company_address_en', '"King Fahd Road, Riyadh, Saudi Arabia"', 'contact', true),
('company_address_ar', '"طريق الملك فهد، الرياض، المملكة العربية السعودية"', 'contact', true),
('social_twitter', '"https://twitter.com/mtpengineering"', 'social', true),
('social_linkedin', '"https://linkedin.com/company/mtp-engineering"', 'social', true),
('social_instagram', '"https://instagram.com/mtpengineering"', 'social', true);