TODO - run through fresh setup on a new machine

# Indiegogo Campaigns Demo

## Live Demo
A live demo of this project is available here: https://campaigns-demo.herokuapp.com/

Note: This is hosted on a free Heroku plan so it may take a few seconds for the first request to load.

## Installation

### Tools

Ensure you have the following tools installed:

#### Git

Git can be installed with your favorite package manager (brew, apt, yum, etc.). Additional instructions can be found here: https://git-scm.com/downloads

##### OS X
```bash
brew install git
```

##### Ubuntu
```bash
sudo apt-get install git
```

Note: You can use a local copy of git if you do not want to `sudo` install as in the command above.

#### RVM

RVM isn't technically required, but some ruby environment manager is recommended. To install rvm, execute the following commands:
```bash
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash
```

Additional instructions can be found here: https://rvm.io/rvm/install

#### Ruby

```bash
rvm install ruby-2.2.0
```

### Clone

Clone the repo & install gems:
```bash
git clone https://github.com/loktar/campaigns-demo.git
cd campaigns-demo
gem install bundler
bundle install
```

### Running Locally

Run a local server:

```bash
ruby app/app.rb
```

View the campaigns page: http://localhost:4567

## Tests

### Unit/BDD tests (Ruby)

```bash
rspec
```

### Unit/BDD tests (Jasmine)

Run the Jasmine server:
```bash
rake jasmine
```

Run jasmine specs: http://localhost:8888

## Backlog

- Show some sort of loading state while campaigns are loading
- Handle errors when fetching campaign data
- Handle case when campaigns load after a search term has already been entered (promises?)
