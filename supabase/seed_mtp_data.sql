-- MTP Engineering Seed Data
-- Based on company profile from PDF
-- Date: 2025-09-21

-- Clear existing data
DELETE FROM project_services;
DELETE FROM project_sectors;
DELETE FROM project_images;
DELETE FROM projects;
DELETE FROM services;
DELETE FROM sectors;
DELETE FROM site_settings;

-- Insert MTP Services based on PDF
INSERT INTO services (name_en, name_ar, description_en, description_ar, icon, sort_order) VALUES
  ('Electrical Installation', 'التركيبات الكهربائية',
   'H.V. and M.V. switch gears, power stations, electrical installations for residential, commercial and industrial buildings, audio/video systems, CCTV systems',
   'المفاتيح الكهربائية عالية ومتوسطة الجهد، محطات الطاقة، التركيبات الكهربائية للمباني السكنية والتجارية والصناعية، أنظمة الصوت والفيديو، أنظمة المراقبة',
   'zap', 1),

  ('HVAC Systems', 'أنظمة التكييف والتهوية',
   'Heating, ventilating and air conditioning complete systems, package central systems, split systems, ventilation systems',
   'أنظمة التدفئة والتهوية والتكييف الكاملة، أنظمة التكييف المركزية، أنظمة السبلت، أنظمة التهوية',
   'wind', 2),

  ('Plumbing & Sanitary', 'السباكة والصرف الصحي',
   'Hydraulic and mechanical installation, sanitary fixtures and network installation, sewer network and treatment plants, water supply systems',
   'التركيبات الهيدروليكية والميكانيكية، تركيب الأدوات الصحية والشبكات، شبكات الصرف الصحي ومحطات المعالجة، أنظمة إمدادات المياه',
   'droplet', 3),

  ('Fire Fighting Systems', 'أنظمة مكافحة الحريق',
   'Fire fighting installation (Sprinkler system), fire alarm systems, CO2 and FM200 systems, complete fire safety solutions',
   'تركيب أنظمة مكافحة الحريق (نظام الرشاشات)، أنظمة إنذار الحريق، أنظمة CO2 و FM200، حلول السلامة من الحرائق الكاملة',
   'flame', 4),

  ('Low Current Systems', 'أنظمة التيار المنخفض',
   'Audio and Video Systems, cable distribution for TVs, public address systems, nurses call systems, CCTV, telephone PABX systems, data networks',
   'أنظمة الصوت والفيديو، توزيع الكابلات للتلفزيون، أنظمة الإذاعة العامة، أنظمة استدعاء الممرضات، المراقبة، أنظمة الهاتف PABX، شبكات البيانات',
   'wifi', 5),

  ('Project Management', 'إدارة المشاريع',
   'Complete project management services covering all aspects of MEP construction and installation',
   'خدمات إدارة المشاريع الكاملة التي تغطي جميع جوانب البناء والتركيب الكهروميكانيكي',
   'clipboard-check', 6);

-- Insert MTP Sectors based on PDF projects
INSERT INTO sectors (name_en, name_ar, sort_order) VALUES
  ('Healthcare', 'الرعاية الصحية', 1),
  ('Education', 'التعليم', 2),
  ('Hospitality', 'الضيافة', 3),
  ('Industrial', 'الصناعي', 4),
  ('Commercial', 'التجاري', 5),
  ('Residential', 'السكني', 6),
  ('Government', 'الحكومي', 7),
  ('Religious', 'الديني', 8);

-- Update company contact information from PDF
INSERT INTO site_settings (key, value, description) VALUES
  ('company_info',
   '{"phone": "+966 2 653 4098", "phone2": "+966 2 653 3928", "phone3": "+966 2 651 2763", "fax": "+966 2 659 3928", "email": "info@mtpksa.com", "po_box": "P.O. Box 20216 Jeddah 21455", "address_en": "Jeddah, Kingdom of Saudi Arabia", "address_ar": "جدة، المملكة العربية السعودية", "website": "www.mtpksa.com"}',
   'Company contact information')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value, description) VALUES
  ('company_profile',
   '{"established": "1980", "experience_years": "32+", "classification": "Special Grade Contractor", "tagline_en": "Where performance meets the quality", "tagline_ar": "حيث يلتقي الأداء بالجودة", "chairman": "Engineer Tawfiq Badr", "description_en": "Leader in Electro-Mechanical engineering and construction, qualified as a special grade company", "description_ar": "رائدة في الهندسة والإنشاءات الكهروميكانيكية، مؤهلة كشركة من الدرجة الخاصة"}',
   'Company profile information')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO site_settings (key, value, description) VALUES
  ('company_resources',
   '{"engineers": 8, "foremen": 23, "electricians": 30, "plumbers": 40, "ac_mechanics": 10, "welders": 6, "total_staff": 180, "equipment": ["Mobile telescopic crane 20 tons", "Hydraulic excavators", "Generators", "Welding machines", "Cable pulling machines"]}',
   'Company resources and capabilities')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Insert major projects from PDF (selecting notable ones)
INSERT INTO projects (
  name_en, name_ar, slug, description_en, description_ar,
  client_name, location_en, location_ar, city,
  start_date, end_date, project_value, status, is_legacy, is_featured
) VALUES
  -- Recent/Ongoing Projects
  ('Le Meridien Towers Makkah', 'أبراج لو ميريديان مكة', 'le-meridien-towers-makkah',
   'Electrical and plumbing works for 2 No. of 22 storage Hotel buildings',
   'الأعمال الكهربائية والسباكة لعدد 2 من مباني الفندق ذات 22 طابقًا',
   'Saudi Oger Ltd', 'Makkah', 'مكة المكرمة', 'Makkah',
   '2004-09-01', NULL, 17000000, 'ongoing', false, true),

  ('Bay La Sun - Tower 4 Rabigh', 'باي لا صن - برج 4 رابغ', 'bay-la-sun-tower-4',
   'Electrical Works (Low and High Current) Plumbing Works, Fire Fighting Works and HVAC Works',
   'الأعمال الكهربائية (التيار المنخفض والعالي) أعمال السباكة، أعمال مكافحة الحريق وأعمال التكييف',
   'Saudi Oger Ltd', 'Rabigh', 'رابغ', 'Rabigh',
   '2010-01-01', NULL, 46000000, 'ongoing', false, true),

  ('KAICC - Jeddah', 'مركز الملك عبدالله الدولي للمؤتمرات - جدة', 'kaicc-jeddah',
   'Building-2 Plumbing works & Fire Fighting Works',
   'المبنى 2 أعمال السباكة وأعمال مكافحة الحريق',
   'Saudi Oger Ltd', 'Jeddah', 'جدة', 'Jeddah',
   '2011-01-01', NULL, 41000000, 'ongoing', false, true),

  ('Ministry of Interior Correctional Facilities', 'مرافق الإصلاح بوزارة الداخلية', 'moi-correctional-facilities',
   'Zone-4 Sanitary & Plumbing works',
   'المنطقة 4 أعمال الصرف الصحي والسباكة',
   'Saudi Bin Ladin Group', 'Jeddah', 'جدة', 'Jeddah',
   '2012-01-01', NULL, 10000000, 'ongoing', false, false),

  -- Completed Projects
  ('King Faisel Specialized Hospital', 'مستشفى الملك فيصل التخصصي', 'kfsh-jeddah',
   'Plumbing and fire fighting renovations works',
   'أعمال تجديد السباكة ومكافحة الحريق',
   'Saudi Oger Ltd', 'Jeddah', 'جدة', 'Jeddah',
   '2000-01-01', '2002-01-01', 4000000, 'completed', false, false),

  ('Le Meridien Hotel Renovation', 'تجديد فندق لو ميريديان', 'le-meridien-renovation',
   'Electrical, Air-conditioning, fire fighting system (CO2, FM 200), fire alarm (1600 detectors), underground gas network, water tank, building management system',
   'الأعمال الكهربائية، التكييف، نظام مكافحة الحريق، إنذار الحريق (1600 كاشف)، شبكة الغاز تحت الأرض، خزان المياه، نظام إدارة المباني',
   'Al Magrabi Group', 'Jeddah', 'جدة', 'Jeddah',
   '2002-05-01', '2003-02-01', 10200000, 'completed', false, true),

  ('Girls Education Headquarter Office', 'المقر الرئيسي لتعليم البنات', 'girls-education-hq',
   'Electrical, Air-conditioning and Sanitary installation',
   'التركيبات الكهربائية والتكييف والصرف الصحي',
   'Girls Education Administration', 'Jeddah', 'جدة', 'Jeddah',
   '1983-01-01', '1985-01-01', 15600000, 'completed', true, false),

  ('MATAF Phase II Project', 'مشروع المطاف المرحلة الثانية', 'mataf-phase-2',
   'Equipment building - Electrical, fire alarm and fighting systems',
   'مبنى المعدات - الأنظمة الكهربائية وإنذار ومكافحة الحريق',
   'BEMCO', 'Makkah Al-Mukaramah', 'مكة المكرمة', 'Makkah',
   '1985-01-01', '1987-01-01', 3657000, 'completed', true, false),

  ('King Abdul Aziz University Library', 'مكتبة جامعة الملك عبد العزيز', 'kau-library',
   'Extension of girls library - Electrical & Air-conditioning',
   'توسعة مكتبة البنات - الأعمال الكهربائية والتكييف',
   'King Abdul Aziz University', 'Jeddah', 'جدة', 'Jeddah',
   '1982-01-01', '1984-01-01', 5398000, 'completed', true, false),

  ('National Glass and Mirror Company HQ', 'المقر الرئيسي للشركة الوطنية للزجاج والمرايا', 'ngm-headquarters',
   'Turn key contract - All civil construction and finishing works, electrical, air-conditioning, sanitary',
   'عقد تسليم مفتاح - جميع أعمال البناء المدني والتشطيبات، الكهرباء، التكييف، الصرف الصحي',
   'National Glass and Mirror Company', 'Jeddah', 'جدة', 'Jeddah',
   '1991-12-01', '1993-12-01', 10300000, 'completed', true, false),

  ('Pilgrims Accommodation Project Mina', 'مشروع إسكان الحجاج بمنى', 'mina-pilgrims-accommodation',
   'Mina tent phase II - All Electrical power and lighting installation, Mechanical installation for 1200 tents',
   'خيام منى المرحلة الثانية - جميع تركيبات الطاقة والإضاءة الكهربائية، التركيبات الميكانيكية لـ 1200 خيمة',
   'Ministry of Public Works and Housing', 'Mina, Makkah', 'منى، مكة', 'Makkah',
   '1998-12-01', '1999-03-01', 2100000, 'completed', true, false),

  ('Prince Khalid Bin Mohammad Palace', 'قصر الأمير خالد بن محمد', 'prince-khalid-palace',
   'Electrical, Air-conditioning, ventilation, Sanitary, CCTV system, paging system, Music system, fire alarm system, telephone & Central satellite system',
   'الأعمال الكهربائية، التكييف، التهوية، الصرف الصحي، نظام المراقبة، نظام النداء، النظام الموسيقي، نظام إنذار الحريق، الهاتف ونظام الأقمار الصناعية المركزي',
   'Prince Khalid Bin Mohammad Bin Saud Al-Kabir', 'Jeddah', 'جدة', 'Jeddah',
   '1996-01-01', '1998-01-01', 12900000, 'completed', true, true),

  ('Al-Rashid Family Compound', 'مجمع عائلة الراشد', 'al-rashid-compound',
   'Turn key contract - Three villas, swimming pool, land and hard scaping, all MEP works',
   'عقد تسليم مفتاح - ثلاث فلل، مسبح، تنسيق الأراضي، جميع الأعمال الكهروميكانيكية',
   'Al-Rashid Family', 'Jeddah', 'جدة', 'Jeddah',
   '1993-12-01', '1995-12-01', 14600000, 'completed', true, false);

-- Add sample team members
INSERT INTO team_members (name_en, name_ar, position_en, position_ar, bio_en, bio_ar, sort_order, is_active) VALUES
  ('Engineer Tawfiq Badr', 'المهندس توفيق بدر',
   'Chairman', 'رئيس مجلس الإدارة',
   'Leading MTP with over 32 years of experience in the electro-mechanical contracting industry',
   'يقود شركة منصور للتجارة والمشاريع بخبرة تزيد عن 32 عامًا في صناعة المقاولات الكهروميكانيكية',
   1, true);

-- Update business hours
INSERT INTO site_settings (key, value, description) VALUES
  ('business_hours',
   '{"sunday_thursday": "8:00 AM - 5:00 PM", "friday_saturday": "Closed", "timezone": "Asia/Riyadh"}',
   'Business operating hours')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Add achievements/statistics
INSERT INTO site_settings (key, value, description) VALUES
  ('company_stats',
   '{"years_experience": 44, "projects_completed": 100, "total_project_value": 500000000, "employees": 180, "ongoing_projects": 4}',
   'Company achievements and statistics')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;