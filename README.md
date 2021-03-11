<img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="TypeScript" src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/> <img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="Redux" src="https://img.shields.io/badge/redux%20-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white"/> <img alt="SASS" src="https://img.shields.io/badge/SASS%20-hotpink.svg?&style=for-the-badge&logo=SASS&logoColor=white"/>

# The ESS SchulichHub

Source code behind the development of the SchulichHub created by the Engineering Students' Society. This project creates a platform for engineering students at the University of Calgary to share, discuss, and initiate technical projects. The SchulichHub aims to connect individuals across departments in order to better experiential learning initiatives from the ESS.

Link to live website: [hub.essucalgary.com](https://hub.essucalgary.com)

### Built With

-   [Ionic React](https://ionicframework.com)

## Getting Started

### Using Docker (recommended)

#### Prerequisites

Ensure that you have Docker and `docker-compose` installed on your development computer: [Docker website](https://www.docker.com). Windows computers will need to use WSL2 (Windows Subsystem for Linux) as a backend following [this guide](https://docs.docker.com/docker-for-windows/wsl/).

#### Installation and Development

```bash
# Clone this repo
git clone https://github.com/ess-uofc/ess-schulichhub.git
cd ess-schulichhub

# Start development server
docker-compose up
```

To quit the development environment, simply press Ctrl+C and the Docker container will shut down.

### Manual method (not recommended)

#### Prerequisites

Ensure that you have the standard Node.js development tools available to use and the Yarn Package Manager installed globally.

-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com)
-   [Ionic CLI](https://ionicframework.com/docs/cli)

#### Installation

To develop or run this repository locally:

```bash
# Clone this repo
git clone https://github.com/ess-uofc/ess-schulichhub.git
cd ess-schulichhub

# Install dependencies
yarn install

# Start development server
ionic serve
```

## Contributing

Pull requests are welcome. Please use semantic commit messages and branch naming conventions using [this guide](https://www.conventionalcommits.org/en/v1.0.0/). Private branches should be named using the `semantic/name/purpose` convention. For example: `docs/ratik/update-readme` signifies that Ratik is responsible for this documentation change and the purpose of the branch is to update the README. For major changes, please open an issue first to discuss what you would like to change. Please base all pull requests off of the main branch as they will be rebase merged. Before opening a pull request: check that there are no linter issues by running `yarn run lint-check` and fix all formatting using `yarn run prettier-fix`. The linear history requirement is enforced on main.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
