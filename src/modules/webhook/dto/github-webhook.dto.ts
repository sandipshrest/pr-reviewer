export class GithubWebhookDto {
  action: string;
  pull_request: {
    title: string;
    body: string;
    html_url: string;
    user: {
      login: string;
    };
  };
  repository: {
    full_name: string;
  };
  sender: {
    login: string;
  };
}
