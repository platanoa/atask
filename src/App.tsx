import { useGithubSearchUsers } from "src/hooks/useGithubSearchUsers";
import { SearchBox } from "src/components/search";
import { Accordion } from "src/components/accordion";
import { UserRepos } from "src/components/user-repos";

function App() {
  
  const { list, handleSearchInput } = useGithubSearchUsers()

  return (
    <div className="p-[15px] grid grid-cols gap-[15px] m-auto w-[480px]">
      <div className="bg-indigo-500 h-[150px] block w-full p-[15px] flex items-end rounded">
        <h1 className="text-white text-2xl font-semibold">Atask</h1>
      </div>
      <SearchBox onChange={handleSearchInput} placeholder="Search user"/>
      {list.map((user) => (
        <Accordion avatar_url={user.avatar_url} title={user.login} key={user.id}>
          <UserRepos user={user}/>
        </Accordion>
      ))}
    </div>
  );
}

export default App;
