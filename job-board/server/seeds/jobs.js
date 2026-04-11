/**
 * Sample Job Data Seed
 * Run this to populate the database with realistic job listings
 */

const sampleJobs = [
  {
    title: "Senior Full Stack Developer",
    company: "TechVision Inc.",
    location: "San Francisco, CA",
    salary: "$150,000 - $200,000 per year",
    jobType: "Full-time",
    experience: "Senior",
    description: `We're looking for an experienced Full Stack Developer to join our rapidly growing engineering team. 
    
You will be responsible for:
- Building scalable web applications using React and Node.js
- Designing and optimizing database schemas for performance
- Leading code reviews and mentoring junior developers
- Collaborating with product and design teams
- Implementing RESTful APIs and microservices

Our ideal candidate has:
- 5+ years of experience with JavaScript/TypeScript
- Strong proficiency in React and Express.js
- Experience with MongoDB or PostgreSQL
- AWS or GCP cloud platform experience
- Excellent communication skills and team player mentality

What we offer:
- Competitive salary and equity package
- Flexible work arrangements
- Health and wellness benefits
- Learning and development budget
- Collaborative and innovative work environment`,
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS", "Docker"],
  },
  {
    title: "Product Manager",
    company: "Innovation Labs",
    location: "New York, NY",
    salary: "$120,000 - $160,000 per year",
    jobType: "Full-time",
    experience: "Mid-level",
    description: `Join our Product Management team and help shape the future of digital solutions!

About the role:
- Define product vision, strategy, and roadmap
- Conduct market research and user interviews
- Collaborate with engineering and design teams
- Manage product lifecycle from conception to launch
- Analyze metrics and drive data-informed decisions
- Prioritize features based on business impact and user needs

Ideal candidate:
- 3-6 years of product management or related experience
- Strong analytical and problem-solving skills
- Experience with Agile/Scrum methodologies
- Knowledge of SaaS or B2B products
- Excellent presentation and communication skills
- Bachelor's degree in Business, Engineering, or related field

Benefits:
- Generous salary and performance bonuses
- Stock options
- Comprehensive health coverage
- Remote work flexibility
- Professional development opportunities`,
    skills: ["Product Strategy", "Data Analysis", "Agile", "User Research", "Stakeholder Management"],
  },
  {
    title: "UI/UX Designer",
    company: "Creative Digital Studio",
    location: "Los Angeles, CA",
    salary: "$90,000 - $130,000 per year",
    jobType: "Full-time",
    experience: "Mid-level",
    description: `We're seeking a talented UI/UX Designer to create beautiful and intuitive digital experiences.

Your responsibilities:
- Design user interfaces for web and mobile applications
- Conduct user research and usability testing
- Create wireframes, prototypes, and design systems
- Collaborate with product and engineering teams
- Implement design best practices and accessibility standards
- Iterate designs based on user feedback and analytics

What we're looking for:
- 2-4 years of UI/UX design experience
- Proficiency in Figma, Adobe XD, or Sketch
- Strong understanding of design principles and HCI
- Experience with responsive and adaptive design
- Portfolio showcasing design process and problem-solving
- Experience with user research methodologies
- Excellent visual communication skills

Why join us:
- Work on high-impact projects
- Collaborative and creative team environment
- Modern design tools and technologies
- Professional growth and mentorship
- Flexible work arrangements
- Competitive benefits package`,
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"],
  },
  {
    title: "DevOps Engineer",
    company: "CloudScale Solutions",
    location: "Seattle, WA",
    salary: "$130,000 - $170,000 per year",
    jobType: "Full-time",
    experience: "Senior",
    description: `CloudScale Solutions is hiring a DevOps Engineer to manage and optimize our cloud infrastructure.

Position overview:
- Design, implement, and maintain CI/CD pipelines
- Manage Kubernetes clusters and containerized applications
- Monitor system performance and implement improvements
- Implement security best practices and compliance measures
- Automate deployment and infrastructure management
- Troubleshoot production issues

We need someone with:
- 4+ years of DevOps or infrastructure engineering experience
- Strong knowledge of AWS, Azure, or GCP
- Expert-level proficiency with Docker and Kubernetes
- Experience with Infrastructure as Code (Terraform, CloudFormation)
- Knowledge of CI/CD tools (Jenkins, GitLab CI, GitHub Actions)
- Linux administration skills
- Python or Bash scripting experience

We offer:
- Competitive compensation package
- Remote work options
- Quarterly learning budget
- Health, dental, and vision coverage
- 401(k) matching
- Collaborative, learning-focused culture`,
    skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Terraform", "Linux"],
  },
  {
    title: "Junior Frontend Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    salary: "$70,000 - $95,000 per year",
    jobType: "Full-time",
    experience: "Entry-level",
    description: `StartupXYZ is looking for enthusiastic Junior Frontend Developer to join our growing team!

About the role:
- Develop and maintain React components
- Build responsive user interfaces
- Write clean, maintainable code
- Collaborate with senior developers and designers
- Participate in code reviews and learn from experienced mentors
- Debug and fix frontend issues
- Learn and implement modern web technologies

Perfect for you if you have:
- 0-2 years of professional experience (or strong portfolio)
- Solid understanding of HTML, CSS, and JavaScript
- Experience with React or similar frameworks
- Familiarity with version control (Git)
- Passion for learning and continuous improvement
- Strong problem-solving skills
- Good communication abilities

We provide:
- Competitive salary for the market
- Mentorship from senior developers
- Career growth opportunities
- Flexible working hours
- Remote-friendly work environment
- Free learning resources and conferences
- Great team culture`,
    skills: ["React", "JavaScript", "HTML", "CSS", "Git"],
  },
  {
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Boston, MA",
    salary: "$110,000 - $150,000 per year",
    jobType: "Full-time",
    experience: "Mid-level",
    description: `Analytics Pro seeks a talented Data Scientist to drive insights and innovation.

What you'll do:
- Build machine learning models for predictive analytics
- Perform statistical analysis on large datasets
- Create data visualizations and dashboards
- Collaborate with business stakeholders to understand requirements
- Optimize algorithms for performance at scale
- Document and present findings to non-technical audiences
- Contribute to data strategy and best practices

Your background includes:
- 3+ years experience in data science or analytics
- Strong proficiency in Python and SQL
- Experience with machine learning libraries (scikit-learn, TensorFlow, PyTorch)
- Knowledge of statistics and experimental design
- Experience with big data tools (Spark, Hadoop)
- Excellent data visualization skills
- Strong communication and storytelling abilities

What we offer:
- Competitive salary and bonus structure
- Cutting-edge tools and technologies
- Collaborative research environment
- Professional development fund
- Health and wellness programs
- Flexible remote work policy
- Interesting, impactful problems to solve`,
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"],
  },
  {
    title: "Backend Engineer (Java)",
    company: "Enterprise Systems Corp",
    location: "Chicago, IL",
    salary: "$125,000 - $165,000 per year",
    jobType: "Full-time",
    experience: "Senior",
    description: `Enterprise Systems Corp is recruiting experienced Backend Engineers to build robust, scalable systems.

About the position:
- Design and develop microservices using Spring Boot
- Build and optimize high-performance APIs
- Work with relational and NoSQL databases
- Implement distributed systems and event-driven architecture
- Collaborate on system design and architecture decisions
- Ensure code quality, security, and performance
- Mentor junior team members

Required qualifications:
- 5+ years of backend development experience
- Expert knowledge of Java and Spring Framework
- Deep understanding of microservices architecture
- Experience with relational databases (PostgreSQL, Oracle)
- Knowledge of message queues and streaming (Kafka, RabbitMQ)
- Familiarity with containerization (Docker)
- Strong problem-solving and communication skills

Perks:
- Excellent compensation package
- Comprehensive benefits
- Professional development opportunities
- Flexible work arrangement
- Collaborative team environment
- Opportunity to work on impactful enterprise solutions`,
    skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Kafka"],
  },
  {
    title: "QA Automation Engineer",
    company: "Quality First Testing",
    location: "Denver, CO",
    salary: "$85,000 - $120,000 per year",
    jobType: "Full-time",
    experience: "Mid-level",
    description: `Quality First Testing is looking for a QA Automation Engineer to ensure product excellence.

Key responsibilities:
- Develop and maintain automated test suites
- Design test strategies and test plans
- Identify, report, and track defects
- Collaborate with developers and product teams
- Perform manual and automated testing
- Implement continuous integration testing
- Improve test coverage and automation frameworks

Ideal candidate has:
- 2-4 years of QA automation experience
- Proficiency in Selenium or similar frameworks
- Strong programming skills (Python, Java, or JavaScript)
- Experience with CI/CD pipelines
- Knowledge of testing methodologies
- Familiarity with JIRA and bug tracking
- Excellent attention to detail

Benefits:
- Competitive salary
- Remote work flexibility
- Health and dental coverage
- Professional development budget
- Friendly and supportive team
- Work-life balance`,
    skills: ["Selenium", "Python", "Test Automation", "JIRA", "CI/CD"],
  },
  {
    title: "Cloud Architect",
    company: "FutureCloud Tech",
    location: "Remote",
    salary: "$160,000 - $220,000 per year",
    jobType: "Full-time",
    experience: "Senior",
    description: `FutureCloud Tech is seeking an experienced Cloud Architect to design enterprise cloud solutions.

Your responsibilities:
- Design scalable, secure, and cost-effective cloud architectures
- Evaluate cloud technologies and recommend solutions
- Lead cloud migration projects
- Implement cloud governance and compliance policies
- Provide technical leadership and guidance
- Conduct cloud readiness assessments
- Optimize cloud costs and performance

What we need:
- 7+ years of cloud architecture experience
- Expert-level knowledge of AWS, Azure, and/or GCP
- Strong understanding of distributed systems
- Experience with infrastructure automation
- Knowledge of security, compliance, and governance
- Excellent communication and leadership skills
- Advanced degree in Computer Science or related field preferred

Compensation & benefits:
- Highly competitive salary
- Stock options
- Remote work (work from anywhere)
- Comprehensive health coverage
- Unlimited learning budget
- Executive coaching
- Quarterly retreats`,
    skills: ["AWS", "Cloud Architecture", "Kubernetes", "Security", "Infrastructure"],
  },
  {
    title: "Technical Writer",
    company: "DocFlow Solutions",
    location: "Portland, OR",
    salary: "$70,000 - $100,000 per year",
    jobType: "Full-time",
    experience: "Mid-level",
    description: `DocFlow Solutions is hiring a Technical Writer to create clear, comprehensive documentation.

Position details:
- Write API documentation, user guides, and tutorials
- Create technical diagrams and wireframes
- Collaborate with engineering and product teams
- Maintain documentation in version control
- Improve documentation clarity and completeness
- Research complex technical topics
- Create video tutorials and screencasts

You're a good fit if you have:
- 2-3 years of technical writing experience
- Strong writing and communication skills
- Familiarity with developer tools and APIs
- Experience with documentation tools (Markdown, Swagger, etc.)
- Ability to explain complex concepts simply
- Experience with version control (Git)
- Attention to detail and organization

What we offer:
- Competitive salary
- Flexible schedule
- Remote-friendly environment
- Creative freedom
- Health and wellness benefits
- Learning opportunities
- Collaborative team`,
    skills: ["Technical Writing", "Markdown", "API Documentation", "Git", "Diagrams"],
  }
];

module.exports = sampleJobs;

