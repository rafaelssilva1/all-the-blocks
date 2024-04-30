# All The Blocks WP Plugin

## Overview
This WordPress plugin provides a collection of custom Gutenberg blocks to enhance the editing experience on your WordPress website. These blocks are designed to offer flexibility and customization options for content creation.

## Installation
To install this plugin, follow these steps:

### Method 1
1. Download the plugin ZIP file.
2. Upload the ZIP file to your WordPress website.
3. Activate the plugin through the WordPress admin panel.

### Method 2
1. Clone repository to plugins folder

### Dependencies
If you want to add on to this plugin with custom blocks of your own, please follow these steps:
1. Clone repository
2. Run ```yarn``` to install dependencies
3. Run ```yarn dev``` to watch for changes and format the files you are working on
4. Run ```yarn build``` to build the necessary files when creating a new custom block

### How to create a new block
1. Create a folder in the ```./includes/block-editor/blocks```
2. Create ```block.json```, ```edit.js```, ```editor.scss```, ```index.js```, ```save.js```, ```script.js```, ```style.scss``` files in the new folder
3. In the ```index.php``` add the new block (use the folder name) to the ```$blocks``` array
4. In the ```webpack.config.js``` add a new entry (again, use the folder name); if you have a custom script the you want to run in the front end add yet another entry to compile the ```script.js``` file in the new block folder and add that file path to the ```block.json``` file
