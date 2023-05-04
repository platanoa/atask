import { useState, ChangeEvent } from "react";
import { useDebounce } from "react-use";
import { octokit } from "src/utils/request";
import { GithubUser } from "src/types/github-user.type";

export function useGithubSearchUsers(){
  const [user, setUser] = useState<string>('');
  const [list, setList] = useState<GithubUser[]>([])
  
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value)
  }

  useDebounce(() => {
    const callUsers = async (user: string) => {
      const response = await octokit.request('GET /search/users', {
        q: user
      })

      setList(response.data.items as GithubUser[])
    }

    if(user) callUsers(user)
  }, 500, [user])



  return { handleSearchInput, list }
}

