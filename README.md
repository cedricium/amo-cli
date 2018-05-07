# amo-cli

[![language: javascript](https://img.shields.io/badge/language-javascript-yellow.svg)](https://github.com/topics/javascript) [![license: MIT](https://img.shields.io/badge/license-MIT-2a2829.svg)](https://github.com/cedricium/rust-playground/blob/master/LICENSE.md)

A CLI tool used for interacting with https://addons.mozilla.org.

Use `amo` to search for and explore all of the extensions and themes listed on Firefox AMO. Features include:

 - search functionality with numerous filtering and sorting capabilities
 - ability to see the latest featured add-ons
 - interactivity that allows you to see an add-on's details like authors, daily users, version, and more!

## Install

```sh
npm install -g amo-cli
```

## Usage

```
$ amo <command> <flags>
```

Some example usages:

> Search for add-ons with the query 'antivirus', limited to only 5 results and interactive mode enabled.
```sh
$ amo search -ip 5 -q 'antivirus'
40 add-ons for "antivirus"
? Which add-on would you like to explore: (Use arrow keys)
❯ Antivirus Online Scanner
  adaware ad block
  Antivirus Robot
  Link Virus Check - Security Plus
  Web Safer with VirusTotal
```

> Get 3 featured add-ons of type 'extension' with their AMO urls displayed.
```sh
$ amo featured --page-size 3 -ut extension
Featured add-ons
· Emoji Cheatsheet
   https://addons.mozilla.org/en-US/firefox/addon/emoji-cheatsheet/
· Reverse Image Search
   https://addons.mozilla.org/en-US/firefox/addon/capture-reverse-image-search/
· Honey
   https://addons.mozilla.org/en-US/firefox/addon/honey/
```

### Commands:

| command  | flags             | description |
| ---      | ---               | ---         |
| featured | -i, --interactive | allows for selecting add-ons to explore their full info |
|          | -p, --page-size   | the number of add-ons to get |
|          | -u, --show-url    | display the add-on's AMO url |
|          | -t, --type        | filter by add-on type  |
|                                            |
| search   | -i, --interactive | allows for selecting add-ons to explore their full info |
|          | -q, --query       | the search query (maximum allowed length is 100 characters |
|          | -p, --page-size   | the number of add-ons to get |
|          | -u, --show-url    | display the add-on's AMO url |
|          | -s, --sort        | sorting parameters |
|          | -t, --type        | filter by add-on type |
|                                            |
| help     |                   | displays the default help message |
|          | `command`         | displays the help message for the given command |
|                                            |
| version  |                   | displays the currently-installed version of `amo-cli` |

### Flag Types and Options:

| flag               | type       | possible values |
| ---                | ---        | ---             |
| -i, --interactive  | `Boolean`  | Default: `false` - if present, set to `true`. Otherwise, is false |
| -p, --page-size    | `Number`   | Default: `25` - zero (0) to total number of add-ons for given query |
| -q, --query        | `String`   | Default: N/A - The maximum length allowed is 100 characters. |
| -s, --sort         | `String`   | Default: `downloads` - can be any one or multiple of: `created`, `downloads`, `hotness`, `random`, `rating`, `relevance`, `updated`, or `users`. See http://addons-server.readthedocs.io/en/latest/topics/api/addons.html#addon-search-sort for more detail. |
| -t, --type         | `String`   | Defaults: `extension` - can be any one of: `theme`<sup>\*</sup>, `search`<sup>\*</sup>, `persona`, `language`<sup>\*</sup>, `extension`, or `dictionary`<sup>\*</sup> |
| -u, --show-url     | `Boolean`  | Default: `false` - if present, set to `true`. Otherwise, is false |

> **Note:** the `type` marked with an asterisk will return zero results when used with the `featured` command

`amo-cli` utilizes the AMO addons-server API. To read the addons-server API documentation, see: http://addons-server.readthedocs.io/en/latest/topics/api/overview.html. View the addons-server source code on GitHub: https://github.com/mozilla/addons-server.

## Contributing

Your contributions are always welcome! See an issue you want to tackle or have an idea for a feature you would like implemented? Just open a pull-request with a short explanation of the changes and I'd be happy to review it. :tada:

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
