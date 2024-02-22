#!/bin/sh
# Print the container's IP address
echo "Container IP address:"
hostname -i

# Start the main process (example: Node.js application)
exec node .
