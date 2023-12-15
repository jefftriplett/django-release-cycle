set dotenv-load := false

@_default:
    just --list

@build:
    cog -P -r script.js

@lint:
    -cog --check script.js
    -djhtml --tabwidth=2 --in-place index.html

@screenshot:
    npx pageres-cli 1200x540 \
        --filename=assets/screenshot \
        --format=png \
        --overwrite \
        https://jefftriplett.com/django-release-cycle/
