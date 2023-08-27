const githubForm = document.getElementById('githubForm');
const usernameInput = document.getElementById('usernameInput');
const userInfoCard = document.getElementById('userInfoCard');

githubForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const apiUrl = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(apiUrl);
    const userData = await response.json();

    userInfoCard.innerHTML = `
      <img src="${userData.avatar_url}" alt="Avatar">
      <h2>${userData.login}</h2>
      <p>Name: ${userData.name || 'N/A'}</p>
      <p>Public Repos: ${userData.public_repos}</p>
      <p>Public Gists: ${userData.public_gists}</p>
      <p>Profile Created At: ${new Date(userData.created_at).toLocaleDateString('en-US')}</p>
    `;

    userInfoCard.classList.add('show');
  } catch (error) {
    console.error('Error fetching user data:', error);
    userInfoCard.innerHTML = '<p>Error fetching user data. Please try again.</p>';
    userInfoCard.classList.remove('show');
  }
});
