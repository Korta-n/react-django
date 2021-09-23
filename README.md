# VidHelpdesk

* [Development Workflow](docs/development-workflow.md)
* [Tech stack](docs/tech-stack.md)

## Repo Structure

- **api**
- **backoffice** - code of the web app for agents
- **bin** - binstubs for development
- **config** - folder with Dockerfiles and extra configs such nginx.conf for ingress
- **docs**
- **website** - an index page that is served on localhost:3000/, it includes demo page for widget testing
- **widget** - code of the embeddable chat widget

## Development

1. Run `bin/setup`.
2. Run `docker-compose up`.
3. Open [localhost:3000](http://localhost:3000).

See [ingress.conf](config/development/ingress.conf) to learn how we route requests to services.

If you're using Windows, see [docs/devenvironment/windows.md](docs/devenvironment/windows.md) for more details.

Check the [docs/graphql/basic-workflow.md](docs/graphql/basic-workflow.md) to get started making GraphQL-related changes on both server and client sides.

### Running Application

`bin/update` installs dependencies and runs database migrations. It makes sense to run it every time after you pulled changes from remote repository.

`docker-compose up` starts all the services, required by the app. When services are running, open [localhost:3000](http://localhost:3000).

Use [binstubs](#binstubs) for running commands inside containers (e.g. installing dependencies).

`docker-compose restart api` restarts single service. It is useful when you changed configuration file.

If you changed `docker-compose.yml` it makes sense to stop all the services and use `docker-compose up` to start them again.

`bin/test` runs tests for all the apps. You can use `bin/backoffice/test` for running tests for backoffice service separately.

`bin/lint` runs linters for all the apps.

### binstubs

See [bin/ folder](bin) for available binstubs. Some of them:

- `bin/api/r` or `bin/backoffice/r` runs any commang in a newly created container with mounted volumes for corresponding service. E.g. `bin/backoffice/r npm install --save dreact` or `bin/api/r /bin/bash`.
- `bin/test` runs tests for all services.
- `bin/lint` runs linters for all services.

### devcontainer

If you use vscode for development you might enjoy running `bin/code` which opens project directory in [dev container](https://code.visualstudio.com/docs/remote/containers).

It is possible to run all the bin/ scripts from devcontainer vscode terminal. vscode automatically binds ssh-agent socket to devcontainer and some of the dotfiles such as .gitconfig so it's possible to use git and ssh in vscode terminal as well. However, some of you might want to mount additional config files such us ~/.gitconfig.local or ~/.zshrc.local. You may do it (see devcontainer service in docker-compose.yml) in docker-compose.override.yml.

You may use any other editor or IDE but they most likely will require some extra configuration since all the dependencies are installed in container volumes for perfomance reasons. Use docker-compose.override.yml if you want to change services settings locally.

Example of docker-compose.override.yml file:
```yaml
services:
  devcontainer:
    volumes:
      - ~/.zshrc.local:/home/dev/.zshrc.local
      - ~/.gitconfig.local:/home/dev/.gitconfig.local
      - ~/.ssh/config:/home/dev/.ssh/config
```

If you mount `~/.zshrc.local` to the devcontainer, you might need to require `~/.zshrc.devcontainer` from it:
```
[[ -f ~/.zshrc.devcontainer ]] && source ~/.zshrc.devcontainer
```

Please make sure you don't have something very host-specific in your `~/.zshrc.local` (e.g. starting `ssh-agent`) or add conditions so those commands aren't executed in the devcontainer.

### Debugging

#### Debugging api in devcontainer

1. Run `bin/code` to launch vscode in devcontainer.
2. Add [breakpoints](https://code.visualstudio.com/docs/editor/debugging#_breakpoints) at places which you want to debug.
3. Press `F5` to start debugging by attaching to a running rails process. The execution will be stopped at any breakpoint when the process hits it.

#### Debugging api with `binding.pry`

1. Add `binding.pry` to the place in the code, where you want execution to be stopped.
2. Run `bin/api/attach` script to attach to running `api` service container so you can use repl prepared by `binding.pry`.

After stopping `bin/api/attach` script it also can stop the api service in the main docker compose process. This happens because when you attach to the container all the input goes to the process in this container. So if you press `ctrl+d` it goes directly to the process. If you press `ctrl+c` it also goes to the process so it stops.

What you really want sometimes is not to stop the process but rather detach from the container. In docker you can do this using the `ctrl+p ctrl+q` combination.

If the api server is terminated, you may launch it back using `docker-compose start api`.

#### Debugging backoffice tests

Debug separate test files in vscode:

1. Add breakpoints in test file you want to debug.
2. Run `bin/backoffice/test-debug src/tests/components/tickets/List.test.tsx` where `src/tests/components/tickets/List.test.tsx` is a file with tests.
3. Open debugger and attach to running node process, the task is called "backoffice: attach to test".

It is possible to do the same via Chrome DevTools, however it would require a modification of `bin/backoffice/test-debug` to expose debugger server port (9229) to the host.


## Deploy and K8s Cluster

### Setup

Setup the connections to the AWS console and kubernetes cluster on your computer:
```
bin/cluster/setup
```

<details>
  <summary>What to do in case of the "name 'ssl' is not defined" error?</summary>
  Make sure the "aws cli" is up to date. Try to bump it up or reinstall.
</details>

This setup script will ask you for API credentials. You may get them in the AWS Web Console: [console.aws.amazon.com/iam/home?#/security_credentials](https://console.aws.amazon.com/iam/home?#/security_credentials).

Pay attention, in order to use your account you **must** setup 2FA and sign out and sign in to the Web console. It is recommended to use 1password for storing 2FA credentials.

<details>
  <summary>How MFA TOTP key looks like?</summary>
  TOTP is a temporary Two-Factor Authentication code.
  It can be found in 2FA apps like Google Authenticator.
  It looks like a 6-digit number (i.e "548 873")
</details>

When we make calls to the AWS API we don't use our generated API key, instead, we use this key and TOTP to generate special token that is valid only for limited amount of time (about 24 hours). When this token is expired we should use `bin/cluster/update-mfa <TOTP>` to generate a new token and update credentials in `~/.aws/credentials`. As soon as you updated the token you might continue to use `aws` and `kubectl` commands.

### Deploy

The code pushed to the "main" branch will be deployed automatically. If you want to trigger deployment from your computer, you can use `bin/deploy` script:
```
VERSION=v3c2f351-local bin/deploy
```

### CI Debug

You may put a breakpoint in CI configuration and connect to the build via SSH: [docs.aws.amazon.com/codebuild/latest/userguide/session-manager.html#ssm-pause-build](https://docs.aws.amazon.com/codebuild/latest/userguide/session-manager.html#ssm-pause-build).

In order to use `bin/cluster/codebuild-debug` you need to install [session manager plugin](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html) (e.g. `brew install session-manager-plugin`).

1. Change `config/cicd/buildspec.yml` and put `codebuild-breakpoint` where you want execution to be paused.
2. Commit your changes and push to GitHub.
3. Run `bin/cluster/codebuild-debug <reference>`, where reference is a branch name (e.g. `vh-178000357-make-agent-input-working`) or commit hash (e.g. `c95b2c1a0a1406102362e710b45107c4c4744a69`).

When you're done, run `codebuild-resume && exit` in build container.

### Pod Troubleshooting

If there are a number of restarts, or if a pod is in a CrashLoopBackOff, ImagePullBackOff or Error state, you will need to troubleshoot the deployment by looking at logs or ssh'ing into a container:

```zsh
# Set up the default namespace
$ kubectl config rename-context arn:aws:eks:ca-central-1:150632897228:cluster/vidhelpdesk-staging vidhelpdesk-staging
$ kubectl config set contexts.vidhelpdesk-staging.namespace vidhelpdesk

# List the pods
$ kubectl get pods
$ kubectl get pods --all-namespaces
$ watch -n 5 kubectl get pods # only for Linux environment, run `brew install watch` for MacOS

# Display the logs
$ kubectl logs <pod-id>
$ kubectl logs <pod-id> -c api-init-container
$ kubectl logs -f nginx-ingress-nginx-ingress-698f99dc7-hlqlx -n kube-system

# Display the pod's events
$ kubectl describe pods/<pod-id>
$ kubectl get events --sort-by=.metadata.creationTimestamp

# Ssh into the pod
$ kubectl exec -it <pod-id> -- /bin/bash -l
$ kubectl exec -it <pod-id> -c api-init-container -- /bin/bash -l

# Delete pod (it will create a new one)
$ kubectl delete pod <pod-id>
```
