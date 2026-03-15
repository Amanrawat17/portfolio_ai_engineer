import axios from 'axios'

const GITHUB_USER = 'amanrawat1777'

export async function getRepos() {
  const { data } = await axios.get(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`
  )
  return data
}

export async function getRepoLanguages(owner, repo) {
  try {
    const { data } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/languages`
    )
    return Object.keys(data)
  } catch {
    return []
  }
}
