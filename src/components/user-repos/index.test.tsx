import { render, screen, waitFor, act} from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { UserRepos } from "./index";
import '@testing-library/jest-dom';

jest.mock("axios");

const mockUser = {
  "login": "suna",
  "id": 253831,
  "node_id": "MDQ6VXNlcjI1MzgzMQ==",
  "avatar_url": "https://avatars.githubusercontent.com/u/253831?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/suna",
  "html_url": "https://github.com/suna",
  "followers_url": "https://api.github.com/users/suna/followers",
  "following_url": "https://api.github.com/users/suna/following{/other_user}",
  "gists_url": "https://api.github.com/users/suna/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/suna/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/suna/subscriptions",
  "organizations_url": "https://api.github.com/users/suna/orgs",
  "repos_url": "https://api.github.com/users/suna/repos",
  "events_url": "https://api.github.com/users/suna/events{/privacy}",
  "received_events_url": "https://api.github.com/users/suna/received_events",
  "type": "User",
  "site_admin": false,
  "score": 1
}

const mockData = [
  {
    name: "Repo 1",
    url: "https://github.com/testuser/repo1",
    description: "My first test repository",
  },
  {
    name: "Repo 2",
    url: "https://github.com/testuser/repo2",
    description: "My second test repository",
  },
];
describe("UserRepos", () => {
  it("shows loading state while fetching data", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.get.mockResolvedValueOnce({ data: mockData } as AxiosResponse);

    render(<UserRepos user={mockUser} />);

    expect(screen.queryByText("Loading")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Repo 1/i)).toBeInTheDocument());
    expect(screen.queryByText("Loading")).not.toBeInTheDocument();
  });
});