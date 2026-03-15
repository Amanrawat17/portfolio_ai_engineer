import axios from "axios"

const GITHUB_USER = "Amanrawat17"

export async function getRepos() {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`
    )
    return data
  } catch (error) {
    console.error("GitHub repo fetch error:", error)
    return []
  }
}

export async function getRepoLanguages(owner, repo) {
  try {
    const { data } = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/languages`
    )
    return Object.keys(data)
  } catch (error) {
    console.error("Language fetch error:", error)
    return []
  }
}