---
title: Exporting assets for Android using Affinity Designer
publishDate: 2018-03-09
tags:
  - design
keywords: 
  - design
  - tool
  - affinity
author: "contact@dixita.dev (Dixita Ganatra)"
---

[Affinity Designer](https://affinity.serif.com/en-gb/designer) has a rich feature, Export Persona. I was wondering if it could ease the process of exporting assets for an Android project. Here's what I found after delving into it.

## Preface

This article assumes that you are familiar with navigating around in Affinity Designer. I am going to use an example mockup of a fitness app called Watch Your Steps. This app counts your daily footsteps, the time you were active, the calories you burned, and the distance you walked.

![App Home](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/1-app-home.png)

To use these icons in an Android app, we need to export them. Since this application is going to run on Android devices with various screen sizes, we need to export them for various resolutions.

## The Footsteps

**Step 1:** When your design is ready, switch to Export Persona.

![Affinity's export persona](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/2-affinity-export-persona.png)

**Step 2:** Go to the Slices panel in the right pane.

![Affinity's slices panel](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/3-affinity-slices-panel.png)

To export icons, we need to slice them. Affinity creates a slice for our artwork by default. Now we need to slice the icons from our artwork. We will create slices from layers directly. We could use Slice Tool to create slices manually as well.

**Step 3:** Go to the Layers panel. Select the layers you want to export and click **Create Slice**.

![Layers to be sliced](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/4-layers-to-be-sliced.png)

These are the layers which were created in Draw Persona. We are going to export the layers highlighted above. You should now be able to see blue borders around the sliced layers in your artwork indicating the slices created.

![Slices](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/5-slices.png)

**Step 4:** Go to the Slices panel and uncheck the default slice (the app slice in this example) and any other slice(s) that you don't want to export.

![Sliced layers](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/6-sliced-layers.png)

**Step 5:** Expand a slice by clicking an arrow in the left side and set the file path.

![Expand slice](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/7-expand-slice.png)

It shows the details of a slice. The highlighted area shows the file path of the expanded slice. Since we gave our layers proper names, we can reuse them for file paths.

By default, the size of the png will be **1x** (same as of the icon). We need this size for **drawable-mdpi** in an Android project. Click on the file path, and perform the following steps to set it.

Remove **Scale suffix (1x)** from the filename and prepend `drawable-mdpi/` to our file path (do not forget the trailing /). Because we want our asset to be in the folder `drawable-mdpi/`, named `back_button.png`.

![Drawable MDPI back button](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/8-drawable-mdpi-back_button.gif)

**Step 6:** Follow the previous step for **drawable-hdpi - 1.5x, drawable-xhdpi - 2x, drawable-xxhdpi - 3x and drawable-xxxhdpi - 4x**.

After completing **Step 6**, the slice will look like this:

![All slices with respective folders](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/9-all-slices.png)

We don't have to repeat this procedure for all the following icons. Affinity provides a feature to save this as a preset.

**Step 7:** Click on the menu icon from the top-right side of the Slices panel and select **Create export setup preset**. Then name it **Android** (or whatever you prefer).

![Create android preset](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/10-create-android-preset.gif)

Now we are ready to select the rest of the slices and apply the Android preset on them. 🙌

![Apply android preset](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/11-apply-android-preset.gif)

As you can see, once you create a preset it is extremely easy to apply on others.

**Step 8:** Click **Export Slices** placed in the bottom-right. The icons will be exported within their respective folders. After exporting them, the folder structure will look like this:

![Exported icons](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/12-exported-icons.png)

What if we change the icons later? Do we have to export them again 😕?
No, we don't.

## Bonus

Just check the highlighted option, **Continuous**.

![Continuous](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/13-continuous.png)

Now whenever you save your changes, exported assets will be updated continuously. Isn't it cool 😎?

![Continuous export](/assets/blog/2018-03-09-exporting-assets-for-android-from-affinity-designer/14-continuous-export.gif)

## Application Mockup

You can download the mockup file used in this tutorial here 👇.

[watch-your-steps.afdesign](https://drive.google.com/file/d/1XMIWRoeKHryH2B7i3CMLb30usCDJo3p2/view)
