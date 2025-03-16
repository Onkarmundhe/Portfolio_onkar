#!/bin/bash
echo "Current directory: $(pwd)"
echo "Listing contents:"
ls -la

echo "Installing requirements..."
pip install -r requirements.txt 