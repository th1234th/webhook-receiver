# Webhook Receiver

This is a webhook receiver for the NGINX Microservices March demo architecture.

## Requirements

This project requires either `NodeJS` or `Docker` to run. It also requires you to create a Smee channel on [smee.io](https://smee.io/).

### NodeJS

This project uses `NodeJS`. The current version is specified in [`.tool-versions`](https://github.com/microservices-march/webhook_receiver/blob/main/.tool-versions). `NodeJS` is a rapidly evolving language which makes it critical to explicitly define which version is being used to avoid any potential errors due to mismatched versions.

We recommended that you use [asdf](https://asdf-vm.com/guide/getting-started.html) to manage your local `NodeJS` installation. Once you have `asdf` installed, you can run `asdf install` to automatically install the version of `NodeJS` specified in [`.tool-versions`](https://github.com/microservices-march/webhook_receiver/blob/main/.tool-versions).

<details>
<summary>
#### Why `asdf`?
</summary>
In a microservices environment, you may have to work on projects that use different versions of a runtime like `NodeJS`, or use a different language altogether!

[asdf](https://asdf-vm.com/guide/getting-started.html) is a single tool that lets you manage multiple versions of different languages in isolation and will automatically install and/or switch to the required runtime/version in any directory that has a `.tool-versions` file.

This is helpful in getting closer to [dev/prod parity](https://12factor.net/dev-prod-parity) in a microservices environment.

This way, if we use `asdf` we're guaranteed to be developing, testing, and releasing to a consistent version of `NodeJS`.
</details>

### Docker

You can run this project on a container using `Docker`. This will let you build a simple reproducible image and forget about setting up your local environment. Instructions on how to install `Docker` can be found in the [`Docker` website](https://docs.docker.com/get-docker/).

### Smee

Open up [smee.io](https://smee.io/) on a web browser and select "Start a new channel" (alternatively, navigate to [smee.io/new](https://smee.io/) directly). Make a note of the Webhook Proxy URL that pops up at the top of the screen. For ease of use, export it as an ENV variable:

```bash
export SMEE=<Webhook_Proxy_URL>
```

## Setup

The steps required to setup this project depend on whether you want to run the project locally using `NodeJS`, or run it via `Docker`.

The first step in either case is to clone this repo:

```bash
git clone https://github.com/microservices-march/webhook_receiver
```

### NodeJS

Navigate to the root directory of this project and install the various node modules required to run this project:

```bash
npm install
```

Then, start the webhook receiver service:

```bash
node index.mjs --smee $SMEE
```

By default, the webhook receiver service will listen on port 3000. If you want to change the default value, use the following command instead:

```bash
node index.mjs --smee $SMEE --port <PORT>
```

### Docker

Navigate to the root directory of this project and build a `Docker` image using the provided [`Dockerfile`](https://github.com/microservices-march/webhook_receiver/blob/main/Dockerfile):

```bash
docker build -t webhook_receiver .
```

Once the image is built, run the image to start the webhook receiver service:

```bash
docker run --rm -p 3000:3000 -e SMEE=$SMEE webhook_receiver
```

Do note you can change the local `port` the service is mapped to if you so wish by changing the first parameter of the `-p` flag (e.g. `-p 4000:3000` will map the service to the local `port` 4000).

You can also change the `port` at which the webhook receiver service will listen on internally by using the `PORT` environment variable at runtime:

```bash
docker run --rm -p 3000:<PORT> -e SMEE=$SMEE -e PORT=<PORT> webhook_receiver
```

## Usage

Once the webhook receiver service is running:

1. Open a web browser session to your GitHub repository of choice (you need to have admin permissions for the aforementioned repository)
2. Go to your repository settings
3. Under the `Code and automation` submenu, select `Webhooks`
4. Select `Add webhook`:
   1. For your Payload URL, use your Webhook Proxy URL, $SMEE
   2. For your secret, use `dogburger`
   3. Choose which types of events you would like to trigger this webhook
   4. Select `Add webhook` again to create the webhook trigger
5. Trigger one of the types of events you selected in the previous step
6. If you have setup everything correctly, you should now see the results of the webhook on the terminal you used to launch the service.

## Cleanup

If you want to cleanup any artifacts resulting from running this project, run:

* If you used `NodeJS` to run the project:

  ```bash
  rm -rf node_modules
  ```

* If you used `Docker` to run the project:

  ```bash
  docker rmi webhook_receiver
  ```

## Development

Read the [`CONTRIBUTING.md`](https://github.com/microservices-march/webhook_receiver/blob/main/CONTRIBUTING.md) file for instructions on how to best contribute to this repository.

## License

[Apache License, Version 2.0](https://github.com/microservices-march/webhook_receiver/blob/main/LICENSE)

&copy; [F5 Networks, Inc.](https://www.f5.com/) 2022
