// Start Selected All Elements From HTML
let theInput = document.querySelector(".get-repos input"),
    getButton = document.querySelector(".get-repos .button-get-repos"),
    repoData = document.querySelector(".show-data")
// End Selected All Elements From HTML

// Start Get Repos Fram Github And Show In Page
getButton.onclick = function () {
    if (theInput.value == "") {
        repoData.innerHTML = "<span>Please Write Github Username.</span>";
    } else {
        getRepos(theInput.value);     
    }
}; 

// All function
// ElzerowebSchool
function getRepos(githubUsername) {
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then( (response) => response.json())
    .then( (repositories) => {
        console.log(repositories);
        // Empty The container
        repoData.innerHTML = '';
        repositories.forEach((repo) => {
            showRepoInPage(repo, theInput.value);   
        });
    });
}
function showRepoInPage(repo, githubUsername) {
    let mainDiv = document.createElement('div');
    mainDiv.className = 'repo-box';
    // repo name
    let repoName = document.createTextNode(repo.name);
    mainDiv.appendChild(repoName);
    // repo link
    let theURL = document.createElement('a');
    let theURLText = document.createTextNode('Visit');
    theURL.appendChild(theURLText);
    theURL.href = `https://github.com/${githubUsername}/${repo.name}`;
    theURL.setAttribute('target', '_blank');
    mainDiv.appendChild(theURL);
    // repo stars
    let starsSpan = document.createElement('span');
    let repoStarsText = document.createTextNode(`Stars: ${repo.stargazers_count}`);
    starsSpan.appendChild(repoStarsText);
    mainDiv.appendChild(starsSpan);

    repoData.appendChild(mainDiv);
}