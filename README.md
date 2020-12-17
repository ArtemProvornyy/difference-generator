# Generate Difference
Compares two configuration files and shows a difference.

[![Maintainability](https://api.codeclimate.com/v1/badges/3e24ca52671d0f48bf87/maintainability)](https://codeclimate.com/github/ArtemProvornyy/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3e24ca52671d0f48bf87/test_coverage)](https://codeclimate.com/github/ArtemProvornyy/frontend-project-lvl2/test_coverage)
[![Node CI](https://github.com/ArtemProvornyy/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/ArtemProvornyy/frontend-project-lvl2/actions)

## Installation
Clone this repository and type
```
$ npm link
```

## Show help
```
$ gendiff --help
```

[![asciicast](https://asciinema.org/a/379839.svg)](https://asciinema.org/a/379839)

## Generate difference of two files
You can compare three file types: json, yaml, ini.

```
$ gendiff <filepath1> <filepath2>
```

### Compare JSON files

[![asciicast](https://asciinema.org/a/379824.svg)](https://asciinema.org/a/379824)

### Compare YAML files

[![asciicast](https://asciinema.org/a/379825.svg)](https://asciinema.org/a/379825)

### Compare INI files

[![asciicast](https://asciinema.org/a/379826.svg)](https://asciinema.org/a/379826)


## Output formats
The following output file formatters are supported: stylish, plain, json. Stylish as a default formatter.

```
$ gendiff --format [type] <filepath1> <filepath2>
```
### Stylish format

[![asciicast](https://asciinema.org/a/379841.svg)](https://asciinema.org/a/379841)

### Plain format

[![asciicast](https://asciinema.org/a/379827.svg)](https://asciinema.org/a/379827)

### Json format

[![asciicast](https://asciinema.org/a/379828.svg)](https://asciinema.org/a/379828)
