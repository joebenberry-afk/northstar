#!/bin/sh
# Publishes the package to the registry.
echo published > "$(dirname "$0")/../.published"
echo "Published to registry."
