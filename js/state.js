/* ==========================================================================
   STATE & DATA ENGINE - MOUNT2OCEAN BULK EMAIL PORTAL (20K DAILY CAPACITY)
   ========================================================================== */

const STORAGE_KEYS = {
  SENDER: 'bulk_portal_sender',
  COMPANIES: 'bulk_portal_companies',
  ATTACHMENTS: 'bulk_portal_attachments',
  TEMPLATE: 'bulk_portal_template',
  AI_CONFIG: 'bulk_portal_ai_config',
  SENT_LOGS: 'bulk_portal_sent_logs',
  OWNER_SETTINGS: 'bulk_portal_owner_settings'
};

// Official Mount2ocean Sender Identity
const DEFAULT_SENDER = {
  email: 'sales@mount2ocean.com',
  name: 'Ahsan | Sales Head',
  smtpHost: 'mail.mount2ocean.com',
  smtpPort: 587,
  appPassword: '',
  signature: 'Best regards,\nAhsan | Sales Head\nMount2ocean\nWebsite: https://mount2ocean.com | Tel: +880 1977-477172',
  isLoggedIn: true
};

// Production Target List
const DEFAULT_COMPANIES = [
  {
    "id": 1,
    "name": "A - One Polar Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@mfgbd.net",
    "contactPerson": "Md. Shamsuzzaman",
    "status": "Pending"
  },
  {
    "id": 2,
    "name": "Aaron Denim Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "mazakat@gmail.com",
    "contactPerson": "Md. Mazakat Harun",
    "status": "Pending"
  },
  {
    "id": 3,
    "name": "Abdullah Dyeing Industries Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "abdullahdveing@gmail.com",
    "contactPerson": "Engr. Md. Serajul Islam",
    "status": "Pending"
  },
  {
    "id": 4,
    "name": "Aboni Textiles Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "abdullahdyeing.factory@gmail.com",
    "contactPerson": "S.M. Emdadul Islam",
    "status": "Pending"
  },
  {
    "id": 5,
    "name": "ACS Textiles [Bangladesh] Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "masood@acstextiles.com",
    "contactPerson": "Masood Dawood Akbani",
    "status": "Pending"
  },
  {
    "id": 6,
    "name": "ACS Towel Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "oakbani@acstextiles.com",
    "contactPerson": "Ovais Masood Akbani",
    "status": "Pending"
  },
  {
    "id": 7,
    "name": "Adury Fashion & Print Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "headoffice@thermaxgroup.com",
    "contactPerson": "Abdul Kadir Molla",
    "status": "Pending"
  },
  {
    "id": 8,
    "name": "Adury Knit Composite Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "headoffice@thermaxgroup.com",
    "contactPerson": "Abdul Kadir Mollah",
    "status": "Pending"
  },
  {
    "id": 9,
    "name": "Alltex Industries Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@alltexbd.com",
    "contactPerson": "Barrister Imtiaz Uddin Ahmad Asif",
    "status": "Pending"
  },
  {
    "id": 10,
    "name": "Amanat Shah Weaving Processing Ltd. Unit-02",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "hass@asg-bd.com",
    "contactPerson": "Rezaul Karim",
    "status": "Pending"
  },
  {
    "id": 11,
    "name": "Amber Denim Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "russell@amber.com.bd",
    "contactPerson": "Showkat Aziz Russell",
    "status": "Pending"
  },
  {
    "id": 12,
    "name": "Amber Denim Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@amber.com",
    "contactPerson": "Showkat Aziz Russell",
    "status": "Pending"
  },
  {
    "id": 13,
    "name": "Amber Yam Dyeing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "russell@amber.com.bd",
    "contactPerson": "Showkat Aziz Russell",
    "status": "Pending"
  },
  {
    "id": 14,
    "name": "Ambia Knitting & Dyeing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@ambiagroup.net",
    "contactPerson": "Md. Abul Hashem",
    "status": "Pending"
  },
  {
    "id": 15,
    "name": "Angel Textile Composite Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@angelgroup.com.bd",
    "contactPerson": "Abdul Wadud Bhuiyan",
    "status": "Pending"
  },
  {
    "id": 16,
    "name": "Anwar Dyeing Printing & Finishing Mills",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "astoriyatextile@gmail.com",
    "contactPerson": "Anwar Hossain",
    "status": "Pending"
  },
  {
    "id": 17,
    "name": "Anlima Yam Dyeing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@anlima.com",
    "contactPerson": "Mahmudul Hoque",
    "status": "Pending"
  },
  {
    "id": 18,
    "name": "Anwar Printex Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "mail@anwargroup.com",
    "contactPerson": "Hossain Mehmood",
    "status": "Pending"
  },
  {
    "id": 19,
    "name": "Apon Textile Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "apontextileltd@gmail.com",
    "contactPerson": "Md. Milon Gazi",
    "status": "Pending"
  },
  {
    "id": 20,
    "name": "APS Apparels Ltd. (Dyeing Unit)",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "reza@aps-group.org",
    "contactPerson": "Md. Hasib Uddin",
    "status": "Pending"
  },
  {
    "id": 21,
    "name": "Arena Composite & Spinning Inds.Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "vintagegroup@vintage-grp.net",
    "contactPerson": "Wahidul Islam Chowdhury",
    "status": "Pending"
  },
  {
    "id": 22,
    "name": "AREX",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "tapan@doelgroup.com",
    "contactPerson": "Ashish Kejriwal",
    "status": "Pending"
  },
  {
    "id": 23,
    "name": "Badsha Yarn Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "marketing@badshatex.com",
    "contactPerson": "Md. Badsha Mia",
    "status": "Pending"
  },
  {
    "id": 24,
    "name": "Base Textiles Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@basetextile.com",
    "contactPerson": "Mr. Md. Hasan Shibli",
    "status": "Pending"
  },
  {
    "id": 25,
    "name": "Belkuchi Knitting & Dyeing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "faridurrahman@jointex-bd.com",
    "contactPerson": "Engr. Md. Faridur Rahman",
    "status": "Pending"
  },
  {
    "id": 26,
    "name": "Beq Fabrics (Pvt.) Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "adofia@lusakagroup.com",
    "contactPerson": "Hafizur Rahman",
    "status": "Pending"
  },
  {
    "id": 27,
    "name": "Bhai Bon Coller House",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "akkhanknitfashion@gmail.com",
    "contactPerson": "Haroon-or-Rashid Khan",
    "status": "Pending"
  },
  {
    "id": 28,
    "name": "BHT Industries Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "dbdwil@bhtgroup.net",
    "contactPerson": "Mr. Md. Mustafizur Rahman",
    "status": "Pending"
  },
  {
    "id": 29,
    "name": "Biswas Synthetic Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "babu@biswasgroup.com",
    "contactPerson": "Md. Moinuddin Biswas",
    "status": "Pending"
  },
  {
    "id": 30,
    "name": "Blue Planet Knit Composite Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "badarspinning@gmail.com",
    "contactPerson": "Md. Abdus Salam",
    "status": "Pending"
  },
  {
    "id": 31,
    "name": "Blue Seal Textile Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "smmizan@rising-group.com",
    "contactPerson": "Mahmud Hasan Khan",
    "status": "Pending"
  },
  {
    "id": 32,
    "name": "Chaity Composite Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "kalam@chaity.com",
    "contactPerson": "Md. Abul Kalam",
    "status": "Pending"
  },
  {
    "id": 33,
    "name": "Chandni Textile Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "chandnitextilemills@yahoo.com",
    "contactPerson": "Md. Anisuzzaman Khan",
    "status": "Pending"
  },
  {
    "id": 34,
    "name": "Chittagong Denim Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "mahafuz@chittagongdenim.com",
    "contactPerson": "Mostafizur Rahman",
    "status": "Pending"
  },
  {
    "id": 35,
    "name": "Chroma Tex Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@chromatex.com.bd",
    "contactPerson": "Md. Rokan Uddin Ahmed",
    "status": "Pending"
  },
  {
    "id": 36,
    "name": "Comfit Composite Knit Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@youthbd.com",
    "contactPerson": "Faridul Alam",
    "status": "Pending"
  },
  {
    "id": 37,
    "name": "Comptex Bangladesh Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@comptexbd.com",
    "contactPerson": "Abu Khair Md. Sakhawat",
    "status": "Pending"
  },
  {
    "id": 38,
    "name": "Consumer Knittex Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@cklbd.com",
    "contactPerson": "Alamgir M. Z. Rahman",
    "status": "Pending"
  },
  {
    "id": 39,
    "name": "Dalas Fashions Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@dalasfashions.com",
    "contactPerson": "Md. Zulfikar Ali Sikder",
    "status": "Pending"
  },
  {
    "id": 40,
    "name": "Dhaka Beijing Dyeing & Weaving Industry Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "dbdwil@bhtaroup.net",
    "contactPerson": "Mr. Md. Mustafizur Rahman",
    "status": "Pending"
  },
  {
    "id": 41,
    "name": "DK Knitwear Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@dkabd.com",
    "contactPerson": "Syed A. Q. M. Zahid",
    "status": "Pending"
  },
  {
    "id": 42,
    "name": "Dong Bang Dyeing Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "khokondhaka@yahoo.com",
    "contactPerson": "Mr. Shafiqul Islam Khokon",
    "status": "Pending"
  },
  {
    "id": 43,
    "name": "Dong Bang Textiles Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "khokondhaka@yahoo.com",
    "contactPerson": "Mr. A.K.M. Aminul Islam",
    "status": "Pending"
  },
  {
    "id": 44,
    "name": "Empire Dyeing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@rkgroupbd.net",
    "contactPerson": "Md. Kaiser Ahmed",
    "status": "Pending"
  },
  {
    "id": 45,
    "name": "Envoy Textiles Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "kutub@envoy-group.com",
    "contactPerson": "Engineer Mr. Kutubuddin Ahmed",
    "status": "Pending"
  },
  {
    "id": 46,
    "name": "Essential Knit wear",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "essentialknitwearbd@gmail.com",
    "contactPerson": "Lokman Ahamed",
    "status": "Pending"
  },
  {
    "id": 47,
    "name": "Etafil Accessories Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "tdil@tamishna.com",
    "contactPerson": "Gulzar Alam Chowdhury",
    "status": "Pending"
  },
  {
    "id": 48,
    "name": "Everway Yarn Dyeing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@everwaygroup.com",
    "contactPerson": "Mohammad Monirujjaman",
    "status": "Pending"
  },
  {
    "id": 49,
    "name": "Evince Textiles Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "evince@evincebd.com",
    "contactPerson": "Mr. Anwar-ul-Alam Chowdhury",
    "status": "Pending"
  },
  {
    "id": 50,
    "name": "Experience Textile Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "marketing2@experience-bd.com",
    "contactPerson": "Haroon Maqsood",
    "status": "Pending"
  },
  {
    "id": 51,
    "name": "Fakir Fashion Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@fakirfashion.com",
    "contactPerson": "Fakir Kamruzzaman",
    "status": "Pending"
  },
  {
    "id": 52,
    "name": "Fatullah Fabrics Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "fatullah@gmail.com",
    "contactPerson": "Emdadul Hoque",
    "status": "Pending"
  },
  {
    "id": 53,
    "name": "FM Yam Dyeing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "khandakarajwad@yahoo.com",
    "contactPerson": "Khandakar Abdul Muktadir",
    "status": "Pending"
  },
  {
    "id": 54,
    "name": "Formosa Poly Cotton Textiles (BD) Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "ziz@formosatex.com",
    "contactPerson": "Wu-Wan-Yu",
    "status": "Pending"
  },
  {
    "id": 55,
    "name": "Galaxy Sweaters & Yarn Dyeing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "yousuf@anontexgroup.com",
    "contactPerson": "Jamila Akhter Sima",
    "status": "Pending"
  },
  {
    "id": 56,
    "name": "Glacier Sweater Composite Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "glaciersweater@yahoo.com",
    "contactPerson": "Monirul Hasan Himon",
    "status": "Pending"
  },
  {
    "id": 57,
    "name": "Gonoshasthaya Grameen Textile Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "ggtmltd@gmail.com",
    "contactPerson": "Md. Firoze Buyan",
    "status": "Pending"
  },
  {
    "id": 58,
    "name": "H. H. Textile Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@asiatic-group.com",
    "contactPerson": "Md. Sohrab Hossin",
    "status": "Pending"
  },
  {
    "id": 59,
    "name": "HA-MEEM DENIM LTD.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "rafiq@hameemdenim.com",
    "contactPerson": "A.K. Azad",
    "status": "Pending"
  },
  {
    "id": 60,
    "name": "HA-MEEM Textiles Ltd",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "import@hameemdenim.com",
    "contactPerson": "A.K. Azad",
    "status": "Pending"
  },
  {
    "id": 61,
    "name": "Hamid Fabrics Ltd. (Unit-II)",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "hfl@mahingroup.com",
    "contactPerson": "Abdullah-Al-Mahmud",
    "status": "Pending"
  },
  {
    "id": 62,
    "name": "Hamza Textiles Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "mahosin@ho.dbl-group.com",
    "contactPerson": "M.A. Jabbar",
    "status": "Pending"
  },
  {
    "id": 63,
    "name": "Hi-Tech Clothing Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "rassel.htcc@gmail.com",
    "contactPerson": "Md. Habibur Raihan",
    "status": "Pending"
  },
  {
    "id": 64,
    "name": "Home Textiles Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "hometextiles@apex-th.net",
    "contactPerson": "Mrs. Anarkoli Rashid",
    "status": "Pending"
  },
  {
    "id": 65,
    "name": "Hoorain HTF Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@jamunagroup-bd.com",
    "contactPerson": "Mrs. Sumaiya Islam",
    "status": "Pending"
  },
  {
    "id": 66,
    "name": "Hossain Dyeing & Printing Mills Ltd. (Unit-2)",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@hossaindyeing.com",
    "contactPerson": "Hossain Mehmud",
    "status": "Pending"
  },
  {
    "id": 67,
    "name": "How Are You Textile Industry Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "masud@howareyou-textile.net",
    "contactPerson": "Md. Liu Shuang Chuan",
    "status": "Pending"
  },
  {
    "id": 68,
    "name": "Hun Hsin Textile Co. (BD) Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "jacky731112@gmail.com",
    "contactPerson": "Sung Wei-Lun",
    "status": "Pending"
  },
  {
    "id": 69,
    "name": "HWA Well Textiles (BD) Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@hwawelltex.com",
    "contactPerson": "Su Chin Jung",
    "status": "Pending"
  },
  {
    "id": 70,
    "name": "Ideal Textile Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "md.maidulislam2011@gmail.com",
    "contactPerson": "Md. Shamsul Alam",
    "status": "Pending"
  },
  {
    "id": 71,
    "name": "Impress-Newtex Composite Textiles Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "anisul.islam@impress-newtex.com",
    "contactPerson": "Mr. Tariful Islam Taskeen",
    "status": "Pending"
  },
  {
    "id": 72,
    "name": "Infinia Knitting & Dyeing Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@sunman.net",
    "contactPerson": "Mr. Tanveer Ahmed",
    "status": "Pending"
  },
  {
    "id": 73,
    "name": "Integrated Textile Resources Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "borhan@nclbd.net",
    "contactPerson": "Md. Borhan Uddin",
    "status": "Pending"
  },
  {
    "id": 74,
    "name": "Ismail Anzuman Ara Fabrics Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "mafizubair@gmail.com",
    "contactPerson": "Abdullah Mohammad Zubair",
    "status": "Pending"
  },
  {
    "id": 75,
    "name": "J.M. Fabrics Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@jmfabrics.com",
    "contactPerson": "Syed M.A. Hashem",
    "status": "Pending"
  },
  {
    "id": 76,
    "name": "Jahanara Cotton Tex Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "manik@jahanaratex.com",
    "contactPerson": "Md. Abul Kashem",
    "status": "Pending"
  },
  {
    "id": 77,
    "name": "Jamuna Denims Weaving Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@jamunagroup-bd.com",
    "contactPerson": "Md. Shamim Islam",
    "status": "Pending"
  },
  {
    "id": 78,
    "name": "Jaya Knitting Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "Javaknitting.vandyeing@gmail.com",
    "contactPerson": "S. B. Prasad",
    "status": "Pending"
  },
  {
    "id": 79,
    "name": "Jitu Textile Mills",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "jitutextilemills@gmail.com",
    "contactPerson": "Humayun Kabir Bhuiyan",
    "status": "Pending"
  },
  {
    "id": 80,
    "name": "Johny Textile Mills Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "john_rafioo@yahoo.com",
    "contactPerson": "Alhaj Md. Mukther Hossain",
    "status": "Pending"
  },
  {
    "id": 81,
    "name": "Kamal Textile Mills Limited",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "akpasha@setaragroup.com",
    "contactPerson": "Shah Alam Khan",
    "status": "Pending"
  },
  {
    "id": 82,
    "name": "Karotoa Fibres Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "karotoa@theoffice.net",
    "contactPerson": "Al-haj Md. Abdul Baten",
    "status": "Pending"
  },
  {
    "id": 83,
    "name": "Kazi Textile & Sizing",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "kaziinterlining@gmail.com",
    "contactPerson": "Kazi Nure Alam",
    "status": "Pending"
  },
  {
    "id": 84,
    "name": "KSS Knit Composite Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info kss@mitalifashions.net",
    "contactPerson": "Sayed Abu Yousuf Abdullah",
    "status": "Pending"
  },
  {
    "id": 85,
    "name": "Labib Dyeing Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "azad@starlightgroupbd.com",
    "contactPerson": "Salahuddin Alamgir",
    "status": "Pending"
  },
  {
    "id": 86,
    "name": "Landmark Dyeing & Washing Industries Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "infosys@landmark-grpbd.com",
    "contactPerson": "Mrs. Bina Bhowmik",
    "status": "Pending"
  },
  {
    "id": 87,
    "name": "Landmark Yarn Dyeing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "infosys@landmark-grpbd.com",
    "contactPerson": "Mrs. Bina Bhowmik",
    "status": "Pending"
  },
  {
    "id": 88,
    "name": "Logos Apparels Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "zafirul@logosbd.net",
    "contactPerson": "Md. Amir Hamza Sarker",
    "status": "Pending"
  },
  {
    "id": 89,
    "name": "M. A. Rahman Dyeing Industry Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@saadmusa.com",
    "contactPerson": "Mahammad Mohsin",
    "status": "Pending"
  },
  {
    "id": 90,
    "name": "M. L Dyeing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "fgroup@bdonline.com",
    "contactPerson": "Al-haj Md. Abdul Kader Faruk",
    "status": "Pending"
  },
  {
    "id": 91,
    "name": "M. M. Trade Apparels",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "mmtradeappl@gmail.com",
    "contactPerson": "Md. Zahid Hossain",
    "status": "Pending"
  },
  {
    "id": 92,
    "name": "M.N Dyeing Printing & Washing Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "info@mosharafgroup.com",
    "contactPerson": "Md. Mosharaf Hossain",
    "status": "Pending"
  },
  {
    "id": 93,
    "name": "Madhabdi Dyeing Finishing Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "md.nizamuddinbhuiyan@yahoo.com",
    "contactPerson": "Md. Nizamuddin Bhuiyan",
    "status": "Pending"
  },
  {
    "id": 94,
    "name": "Madina Fabtex Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "madinafabtex@yahoo.com",
    "contactPerson": "Sweeib Sharower Monju",
    "status": "Pending"
  },
  {
    "id": 95,
    "name": "Mahmud Fabrics & Finishing Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "khokondhaka@yahoo.com",
    "contactPerson": "Mr. A.K.M. Aminul Islam",
    "status": "Pending"
  },
  {
    "id": 96,
    "name": "Mak Textile Mills Ltd.",
    "industry": "Dyeing Printing & Finishing",
    "contactEmail": "mak tex@yahoo.com",
    "contactPerson": "Mr. Tapan Kumar Paul",
    "status": "Pending"
  },
  {
    "id": 97,
    "name": "Mount2ocean",
    "industry": "Travels",
    "contactEmail": "info@gmail.com",
    "contactPerson": "Omar Sany",
    "status": "Pending"
  }
];

// Mount2ocean Official Outreach Email Template
const DEFAULT_TEMPLATE = {
  subject: 'Tailored Corporate Travel & Event Management Solutions for {{company_name}}',
  body: `Hi {{contact_person}} Sir ,

I am reaching out from Mount 2 Ocean Travel & Tours regarding potential business collaboration and corporate travel management solutions for {{company_name}} in the {{industry}} sector.  

At Mount 2 Ocean Travel & Tours, we specialize in delivering end-to-end travel, MICE (Meetings, Incentives, Conferences, and Exhibitions), and logistical solutions tailored to help organizations optimize their operational efficiency and streamline corporate travel budgets.  

Our Key Solutions Include:
•	Air Ticketing & Visa Processing: Seamless domestic/international flight bookings with live visa tracking support.  
•	Corporate Event & MICE Support: Complete planning and execution for international conferences, corporate retreats, and exhibitions.  
•	Global Accommodation: Exclusive corporate rates at over 500+ luxury hotels and resorts worldwide.  
•	Transportation & Logistics: Chauffeur services, tourist buses, and premium transport arrangements.  
•	Medical & Specialized Tourism: Comprehensive medical travel assistance via our dedicated Medi Adviser division.  

Given your leadership at {{company_name}}, I have attached our latest company profile for your review. As an IATA-accredited and Ministry-approved travel agency in Bangladesh, we are confident in our ability to deliver exceptional value to your organization.  

Would you be open to a brief 10-minute introductory call next week to discuss how we can support {{company_name}}?

Best regards,
{{sender_name}}

---
If you prefer not to receive future updates, you can [Unsubscribe Here] anytime.`,
  attachments: []
};

const DEFAULT_AI_CONFIG = {
  enabled: true,
  tone: 'Consultative',
  creativity: 'High',
  autoPersonalize: true
};

const DEFAULT_SENT_LOGS = [];

// Owner System Settings Configured for 20,000 Emails/Day High Capacity
const DEFAULT_OWNER_SETTINGS = {
  maxDailyEmails: 20000, // 20,000 Emails Per Day Limit
  staggerDelaySeconds: 2,
  strictSpamThreshold: 85,
  requireUnsubscribeHeader: true,
  domainReputationStatus: 'Verified High Capacity (Mount2ocean)',
  spfStatus: 'Verified (v=spf1 include:mount2ocean.com ~all)',
  dkimStatus: 'Verified (Mount2ocean 2048-bit RSA)',
  dmarcStatus: 'Verified (p=reject; rua=mailto:dmarc@mount2ocean.com)'
};

class AppState {
  constructor() {
    this.sender = this.load(STORAGE_KEYS.SENDER, DEFAULT_SENDER);
    this.companies = this.load(STORAGE_KEYS.COMPANIES, DEFAULT_COMPANIES);
    this.template = this.load(STORAGE_KEYS.TEMPLATE, DEFAULT_TEMPLATE);
    this.aiConfig = this.load(STORAGE_KEYS.AI_CONFIG, DEFAULT_AI_CONFIG);
    this.sentLogs = this.load(STORAGE_KEYS.SENT_LOGS, DEFAULT_SENT_LOGS);
    this.ownerSettings = this.load(STORAGE_KEYS.OWNER_SETTINGS, DEFAULT_OWNER_SETTINGS);

    // Enforce 20,000 daily capacity limit
    if (this.ownerSettings.maxDailyEmails < 20000) {
      this.ownerSettings.maxDailyEmails = 20000;
      this.save(STORAGE_KEYS.OWNER_SETTINGS, this.ownerSettings);
    }
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`Failed to parse localStorage key ${key}`, e);
      return fallback;
    }
  }

  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to save localStorage key ${key}`, e);
    }
  }

  updateSender(senderData) {
    this.sender = { ...this.sender, ...senderData };
    this.save(STORAGE_KEYS.SENDER, this.sender);
  }

  addCompany(company) {
    company.id = Date.now();
    company.status = company.status || 'Pending';
    this.companies.push(company);
    this.save(STORAGE_KEYS.COMPANIES, this.companies);
  }

  removeCompany(id) {
    this.companies = this.companies.filter(c => c.id !== id);
    this.save(STORAGE_KEYS.COMPANIES, this.companies);
  }

  clearCompanies() {
    this.companies = [];
    this.save(STORAGE_KEYS.COMPANIES, this.companies);
  }

  updateTemplate(templateData) {
    this.template = { ...this.template, ...templateData };
    this.save(STORAGE_KEYS.TEMPLATE, this.template);
  }

  updateAiConfig(config) {
    this.aiConfig = { ...this.aiConfig, ...config };
    this.save(STORAGE_KEYS.AI_CONFIG, this.aiConfig);
  }

  addSentLog(logEntry) {
    this.sentLogs.unshift(logEntry);
    this.save(STORAGE_KEYS.SENT_LOGS, this.sentLogs);
  }

  updateOwnerSettings(settings) {
    this.ownerSettings = { ...this.ownerSettings, ...settings };
    this.save(STORAGE_KEYS.OWNER_SETTINGS, this.ownerSettings);
  }
}

window.appState = new AppState();
