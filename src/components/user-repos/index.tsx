import { Fragment, useEffect, useState } from "react";
import { GithubUser, RepoData } from "src/types/github-user.type";
import axios from "axios";


interface UserReposProps{
  user: GithubUser;
}

interface State{
  loading: boolean;
  error: boolean;
  data: RepoData[] | undefined
}

export function UserRepos ({user}: UserReposProps) {

  const [{loading, error, data}, setState] = useState<State>({
    loading: true,
    error: false,
    data: undefined
  })

  useEffect(()=>{
    const fetchUserRepos = async () => {
      const response = await axios.get(user.repos_url)
      if(!response){
        setState((prev) => ({
          ...prev,
          loading: false,
          error: true,
          data: undefined
        }))
      }
      else{
        setState((prev)=>({
          ...prev,
          loading: false,
          error: false,
          data: response.data
        }))
      }
    }

    fetchUserRepos()
  },[])

  if(loading) return (
    <Fragment>
      <div>Loading</div>
    </Fragment>
  )
  
  if(error) return (
    <Fragment>
      <div>Error</div>
    </Fragment>
  )

  return (
    <ul role="list" className="my-5 divide-y divide-gray-200">
      {data?.map(repo => (
        <li className="py-5" key={repo.url}>
          <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
            <h3 className="text-sm font-semibold text-gray-800">
              <a href={repo.url} className="hover:underline focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {repo.name}
              </a>
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{repo.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}