function showForm(formId) {
    document.getElementById('signUpForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById(formId).style.display = 'block';
  }
  
  function signUp(event) {
    event.preventDefault();
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const role = document.getElementById('signUpRole').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    if (users.find(user => user.email === email)) {
      alert('Email already exists');
      return;
    }
  
    users.push({
        name,
        email,
        password,
        role,
        signupDate: new Date().toISOString(),
        stats: {
          jobsPosted: 0,
          jobsCompleted: 0,
          rating: 0
        }
      });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    showForm('loginForm');
  }
  
  function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('Login successful');
      window.location.href = 'jobs.html';
    } else {
      alert('Invalid credentials');
    }

  }

  // Assume this function is called after successful signup or login
function redirectToJobsPage() {
    // Check if the user is a client (you would need some way to determine this, perhaps a role attribute in the user object)
    const isClient = true; // Assuming the user is a client for demonstration
  
    if (isClient) {
      // Redirect to the jobs page
      window.location.href = 'myjobs.html';
    }
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('job-list')) {
      const response = await fetch('http://localhost:5000/api/jobs');
      const jobs = await response.json();
      const jobList = document.getElementById('job-list');
      jobList.innerHTML = jobs.map(job => `
        <div>
          <h3>${job.title}</h3>
          <p>${job.description}</p>
          <p>Category: ${job.category}</p>
          <p>Budget: $${job.budget}</p>
          <p>Deadline: ${new Date(job.deadline).toLocaleDateString()}</p>
          <button onclick="applyForJob('${job._id}')">Apply</button>
        </div>
      `).join('');
    }
  
    if (document.getElementById('profile-details')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        document.getElementById('profile-details').innerHTML = `
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
          <p>Role: ${user.role}</p>
          <p>Skills: ${user.skills.join(', ')}</p>
          <p>Rating: ${user.rating}</p>
        `;
      } else {
        window.location.href = 'udogigs.html';
      }
    }
  });
  
  async function applyForJob(jobId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('You need to login first');
      window.location.href = 'udogigs.html';
      return;
    }
  
    const response = await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workerId: user._id }),
    });
  
    const data = await response.json();
    if (response.ok) {
      alert('Application successful');
    } else {
      alert(`Error: ${data.error}`);
    }
  }
  
/*JOBS
document.addEventListener('DOMContentLoaded', () => {
    const jobList = document.getElementById('job-list');
  
    // Initial microjobs data
    const initialJobs = [
      { title: 'Write a short review', description: 'Write a review about a product.', budget: 1.00 },
      { title: 'Fill a survey', description: 'Participate in a 5-minute survey.', budget: 0.50 },
      { title: 'Test a website', description: 'Provide feedback on a website usability.', budget: 0.75 },
      { title: 'Share a post', description: 'Share a post on social media.', budget: 0.10 },
      { title: 'Like a page', description: 'Like a social media page.', budget: 0.05 },
      { title: 'Watch a video', description: 'Watch a 2-minute video.', budget: 0.20 },
      { title: 'Comment on a blog', description: 'Leave a comment on a blog post.', budget: 0.15 },
      { title: 'Subscribe to a newsletter', description: 'Subscribe to a mailing list.', budget: 0.25 },
      { title: 'Retweet a tweet', description: 'Retweet a specific tweet.', budget: 0.05 },
      { title: 'Upload a photo', description: 'Upload a photo to a website.', budget: 0.30 },
      { title: 'Test an app', description: 'Download and test a mobile app.', budget: 0.50 },
      { title: 'Follow an account', description: 'Follow an account on social media.', budget: 0.05 },
      { title: 'Join a group', description: 'Join a group on social media.', budget: 0.10 },
      { title: 'Create an account', description: 'Create an account on a platform.', budget: 0.80 },
      { title: 'Leave a positive review', description: 'Leave a positive review on a product.', budget: 0.60 },
      { title: 'Download a document', description: 'Download a document from a website.', budget: 0.05 },
      { title: 'Write a testimonial', description: 'Write a testimonial for a service.', budget: 0.90 },
      { title: 'Visit a website', description: 'Visit a specific website.', budget: 0.05 },
      { title: 'Pin a post', description: 'Pin a post on Pinterest.', budget: 0.10 },
      { title: 'Answer a question', description: 'Answer a question on a forum.', budget: 0.50 }
    ];
  
    // Load initial jobs to local storage if not already set
    if (!localStorage.getItem('jobs')) {
      localStorage.setItem('jobs', JSON.stringify(initialJobs));
    }
  
    // Function to display jobs
    function displayJobs() {
      const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
      jobList.innerHTML = jobs.map(job => `
        <div class="job">
          <h3>${job.title}</h3>
          <p>${job.description}</p>
          <p>Budget: $${job.budget.toFixed(2)}</p>
        </div>
      `).join('');
    }
  
    // Function to add a new job
    window.addJob = function(event) {
      event.preventDefault();
      const title = document.getElementById('jobTitle').value;
      const description = document.getElementById('jobDescription').value;
      const budget = parseFloat(document.getElementById('jobBudget').value);
  
      const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
      jobs.push({ title, description, budget });
      localStorage.setItem('jobs', JSON.stringify(jobs));
  
      document.getElementById('addJobForm').reset();
      displayJobs();
    }
  
    displayJobs();
  });*/

  document.addEventListener('DOMContentLoaded', () => {
    const jobList = document.getElementById('job-list');
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    jobList.innerHTML = jobs.map(job => `
      <a href="job-details.html?id=${job.id}" class="job-link">
        <div class="job">
          <h3>${job.title}</h3>
          <p>Country: ${job.country}</p>
          <p>Amount: $${job.amount}</p>
          <p>Days: ${job.days}</p>
          <p>Workers: ${job.workers}</p>
        </div>
      </a>
    `).join('');
  });

  function addJob(event) {
    event.preventDefault();
    const title = document.getElementById('jobTitle').value;
    const country = document.getElementById('jobCountry').value;
    const amount = parseFloat(document.getElementById('jobAmount').value);
    const days = parseInt(document.getElementById('jobDays').value);
    const workers = parseInt(document.getElementById('jobWorkers').value);
    const proof = document.getElementById('jobProof').value;
    const excludedCountries = document.getElementById('jobExcludedCountries').value.split(',');
    const category = document.getElementById('jobCategory').value;
    const timeToRate = document.getElementById('jobTimeToRate').value;
    const instructions = document.getElementById('jobInstructions').value;
    const clientEmail = JSON.parse(localStorage.getItem('currentUser')).email;
  
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const newJob = {
      id: jobs.length + 1,
      title,
      country,
      amount,
      days,
      workers,
      proof,
      excludedCountries,
      category,
      timeToRate,
      instructions,
      clientEmail,
      workersCompleted: 0
    };
  
    jobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    window.location.reload();
  }

  const initialJobs = [
    { id: 1, title: 'Survey Participation', country: 'USA', amount: 0.5, days: 1, workers: 5 },
    { id: 2, title: 'App Testing', country: 'Canada', amount: 1, days: 2, workers: 3 },
    { id: 3, title: 'Data Entry', country: 'UK', amount: 0.75, days: 1, workers: 10 },
    { id: 4, title: 'Website Review', country: 'Australia', amount: 1, days: 3, workers: 2 },
    { id: 5, title: 'Product Feedback', country: 'India', amount: 0.5, days: 1, workers: 15 },
    { id: 6, title: 'Logo Design', country: 'International', amount: 1, days: 4, workers: 4 },
    { id: 7, title: 'Blog Commenting', country: 'USA', amount: 0.2, days: 1, workers: 7 },
    { id: 8, title: 'Social Media Share', country: 'International', amount: 0.1, days: 1, workers: 20 },
    { id: 9, title: 'Video Testimonial', country: 'UK', amount: 1, days: 2, workers: 5 },
    { id: 10, title: 'Voice Over', country: 'Canada', amount: 1, days: 3, workers: 1 },
    { id: 11, title: 'Transcription', country: 'Australia', amount: 0.75, days: 1, workers: 8 },
    { id: 12, title: 'Translation', country: 'International', amount: 1, days: 2, workers: 4 },
    { id: 13, title: 'Banner Design', country: 'India', amount: 0.8, days: 1, workers: 6 },
    { id: 14, title: 'Website Bug Report', country: 'USA', amount: 0.5, days: 2, workers: 3 },
    { id: 15, title: 'Forum Posting', country: 'UK', amount: 0.25, days: 1, workers: 12 },
    { id: 16, title: 'Ebook Review', country: 'Canada', amount: 0.5, days: 3, workers: 7 },
    { id: 17, title: 'Podcast Feedback', country: 'Australia', amount: 0.4, days: 2, workers: 10 },
    { id: 18, title: 'Article Writing', country: 'International', amount: 1, days: 4, workers: 2 },
    { id: 19, title: 'Recipe Testing', country: 'India', amount: 0.6, days: 1, workers: 3 },
    { id: 20, title: 'Game Beta Testing', country: 'USA', amount: 1, days: 2, workers: 5 }
  ];
  
  if (!localStorage.getItem('jobs')) {
    localStorage.setItem('jobs', JSON.stringify(initialJobs));
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const job = jobs.find(job => job.id == jobId);

    if (!job) {
      document.getElementById('job-details').innerHTML = '<p>Job not found.</p>';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const client = users.find(user => user.email === job.clientEmail);

    document.getElementById('job-details').innerHTML = `
      <h2>${job.title}</h2>
      <p><strong>Amount:</strong> $${job.amount}</p>
      <p><strong>Country:</strong> ${job.country}</p>
      <p><strong>Proof:</strong> ${job.proof}</p>
      <p><strong>Excluded Countries:</strong> ${job.excludedCountries.join(', ')}</p>
      <p><strong>Workers Allocated:</strong> ${job.workers}</p>
      <p><strong>Workers Remaining:</strong> ${job.workers - job.workersCompleted}</p>
      <p><strong>Client Name:</strong> ${client.name}</p>
      <p><strong>Client Signup Date:</strong> ${new Date(client.signupDate).toLocaleDateString()}</p>
      <p><strong>Category:</strong> ${job.category}</p>
      <p><strong>Time to Rate:</strong> ${job.timeToRate}</p>
      <p><strong>Buyer's Stats:</strong> ${client.stats}</p>
      <p><strong>Instructions:</strong> ${job.instructions}</p>
    `;

    document.getElementById('submit-proof-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const proof = document.getElementById('proof').value;
      if (!job.proofs) job.proofs = [];
      job.proofs.push(proof);
      job.workersCompleted++;
      localStorage.setItem('jobs', JSON.stringify(jobs));
      alert('Proof submitted successfully!');
      window.location.reload();
    });
  });

// Get the current year and update the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get the last modified date of the document and update the footer
document.getElementById('lastModified').textContent = "Last Modified: " + document.lastModified;
