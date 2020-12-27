# Generate Difference
Compares two configuration files and shows a difference.

[![Maintainability](https://api.codeclimate.com/v1/badges/3e24ca52671d0f48bf87/maintainability)](https://codeclimate.com/github/ArtemProvornyy/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3e24ca52671d0f48bf87/test_coverage)](https://codeclimate.com/github/ArtemProvornyy/frontend-project-lvl2/test_coverage)
[![Node CI](https://github.com/ArtemProvornyy/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/ArtemProvornyy/frontend-project-lvl2/actions)

## Installation
Clone this repository and type:
```
$ npm link
```

## Show help
```
$ gendiff --help
```

[![asciicast](https://asciinema.org/a/505Kieibyc3i6DWBJQgiR5VIO.svg)](https://asciinema.org/a/505Kieibyc3i6DWBJQgiR5VIO)

## Generate difference of two files
You can compare two file types: json and yaml.

```
$ gendiff <filepath1> <filepath2>
```

### Compare JSON files

[![asciicast](https://asciinema.org/a/6hnimuGDPrFr56WDOvpVrGZgs.svg)](https://asciinema.org/a/6hnimuGDPrFr56WDOvpVrGZgs)

### Compare YAML files

[![asciicast](https://asciinema.org/a/hdRiT9InCMtLxWcieflcR55RW.svg)](https://asciinema.org/a/hdRiT9InCMtLxWcieflcR55RW)

## Output formats
The following output file formatters are supported: stylish, plain, json. Stylish as a default formatter.

```
$ gendiff --format [type] <filepath1> <filepath2>
```
### Stylish format

[![asciicast](https://asciinema.org/a/MLEe21DjCrtYI9eU7vBOkFVYL.svg)](https://asciinema.org/a/MLEe21DjCrtYI9eU7vBOkFVYL)

### Plain format

[![asciicast](https://asciinema.org/a/zdlFZe9zsBHbM0xcCnIo3zvtj.svg)](https://asciinema.org/a/zdlFZe9zsBHbM0xcCnIo3zvtj)

### Json format

[![asciicast](https://asciinema.org/a/rvxQrAsKMxSJ24U4DuVrZACkQ.svg)](https://asciinema.org/a/rvxQrAsKMxSJ24U4DuVrZACkQ)
