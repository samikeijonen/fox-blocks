# Contributing to Fox Blocks

## Setting up the project

1. Fork this repository to your account.

2. Open terminal and navigate to `wp-content/plugins/` of your project. You might need to initiate git if it's not already initiated with

```
git init
```

Clone your fork of the repo inside.

```
git clone https://github.com/{YOUR-USERNAME}/fox-blocks.git
```

3. Navigate to `fox-blocks` folder:

```
cd fox-blocks
```

4. Get dependencies

```
npm install

composer install
```

5. Build project

```
npm run build
```

6. Go to your dashboard and activate plugin Fox Blocks. Now you have all existing blocks available.

## Contribute with code

1. Branching

There are no preferences on naming branches for pull request. Usage of prefixes such as `feature/*`, `fix/*`, `docs/*` etc is welcomed for the sake of clarity.

2. When project is set (follow steps from above), run watcher:

```
npm run start
```

Start adding your code.

3. Create pull request

When you're happy with your code push it to your fork and then create pull request to this repository.

