module.exports = {
  users: [
    {
      name: 'Acme Corp',
      email: 'employer@acme.com',
      password: 'password123',
      role: 'employer',
    },
    {
      name: 'Jane Doe',
      email: 'candidate@demo.com',
      password: 'password123',
      role: 'candidate',
    },
    {
      name: 'John Smith',
      email: 'candidate2@demo.com',
      password: 'password123',
      role: 'candidate',
    },
  ],
  jobs: [
    {
      title: 'Frontend Developer',
      description: 'Build responsive web applications with React, HTML, CSS and REST APIs.',
      company: 'Acme Corp',
      location: 'Remote',
      salary: '$70k - $85k',
    },
    {
      title: 'Backend Engineer',
      description: 'Design and maintain Node.js APIs, MongoDB schemas, and authentication flows.',
      company: 'Acme Corp',
      location: 'New York, NY',
      salary: '$90k - $110k',
    },
    {
      title: 'Product Designer',
      description: 'Create user interfaces, wireframes, and collaborate with product teams.',
      company: 'Acme Corp',
      location: 'San Francisco, CA',
      salary: '$80k - $95k',
    },
  ],
  applications: [
    {
      userEmail: 'candidate@demo.com',
      jobTitle: 'Frontend Developer',
      resume: 'sample-resume.pdf',
      status: 'pending',
    },
    {
      userEmail: 'candidate2@demo.com',
      jobTitle: 'Backend Engineer',
      resume: 'sample-resume.pdf',
      status: 'pending',
    },
  ],
};
