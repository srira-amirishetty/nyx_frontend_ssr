#!/bin/bash

# Check if package.json file exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json file not found. Exiting..."
    exit 1
fi

# Install packages listed in package.json with force
echo "Installing packages listed in package.json with force..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "Packages installed successfully."
else
    echo "Failed to install packages. Exiting..."
    exit 1
fi

# Remove .next cache folder
echo "Removing .next cache folder..."
rm -rf .next

# Check if removal was successful
if [ $? -eq 0 ]; then
    echo ".next cache folder removed successfully."
else
    echo "Failed to remove .next cache folder. Exiting..."
    exit 1
fi

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Project built successfully."
else
    echo "Failed to build the project. Exiting..."
    exit 1
fi

echo "All steps completed successfully."
