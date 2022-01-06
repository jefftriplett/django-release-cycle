@_default:
    just --list

@build:
    cog -r script.js


    #/usr/local/bin/bash

@screenshot:
    npx pageres-cli 1200x540 \
        --filename=assets/screenshot \
        --format=png \
        --overwrite \
        https://jefftriplett.com/django-release-cycle/
