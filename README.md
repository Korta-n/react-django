# React + Django

## Repo Structure

- **bin** - main binstubs for the project
- **djangoReact** - code of the django project
- **mainapp** - code of models/views for django
- **mainapp-ui** - code of the main React app
- **static** - project statics ( + from React App )

## Setup

1. Run `bin/setup`
2. Run `bin/start/server` to run server in localhost
3. Open [React App : 127.0.0.1:8000](http://127.0.0.1:8000/)

## binstubs

This project includes my own binstubs so fell free to use them ;)

See [bin/folder](bin) for available binstubs.

## Running Application

#### To make changes in React App:

1. `bin/build` create build out from `mainapp-ui` react app. It makes sense to run it every time after you made changes in `mainapp-ui/folder`

#### To make changes in Django:

1. Be sure to `Ctrl+C` old connection.
2. Run `bin/start/server` to run server once again.

## Development

1. Run `bin/start/dev`. (If you're using VScode)
2. Look through the source code. Enjoy :).
