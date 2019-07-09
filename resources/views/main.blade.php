<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>BRM Inventory App</title>

  </head>

  <body>
    <div id="root"></div>

    <script src="{{ mix('/js/app.js') }}" charset="utf-8"></script>
  </body>

</html>
