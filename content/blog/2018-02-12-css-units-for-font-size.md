---
title: "CSS units for font-size: px | em | rem"
date: 2018-02-12
tags:
  - web
keywords: 
  - web
  - css
author: ""
---

When I started digging into CSS, I found various units for `font-size`. It was a bit confusing as to which one to use when, where and why. After investing some time, I found three units that I decided to use in my projects - `px`, `em` and `rem`.

## px

Pixels are the easiest measurement to use. But there is a catch. Let’s say we used pixels throughout our website and we managed the media queries too. What if a user changes the default font-size of browser (or device)? Your header’s font-size (say 20px) will remain 20 px. Hence user’s font preferences won’t be reflected. Which is not a good user experience. So, pixels may be good at spacing and layout but are not good fit for font-size. ems and rems are at rescue.

## em

An `em` is equal to the computed `font-size` of that element’s parent. For example, If there is a `div` element defined with `font-size: 16px` then for that `div` and for its children `1em = 16px`.

If font-size is not defined explicitly, that element will inherit it from the parent element. The inheritance continues to take place this way amongst ancestors up until the root element. Default font-size of the root element is provided by browser.

Here is [an example](https://codepen.io/dixita0607/embed/QQNomG) for em.

In the example, you can see we gave `font-size: 20px` to.parent and `font-size: 1.5em` to.child. Computed font sizes of both `.child`(`#outerChild` and `#innerChild`) are different. `#outerChild` uses font-size from its parent `.parent`. So, computed font-size of `#outerChild` will be 1.5 _20px = 30px. And `#innerChild` uses font-size from its parent `#outerChild` (which already has computed font-size of 30px). Hence the computed font-size of nested `.child` will be 1.5_ 30px = 45px.

If you want to use `em` for your units, you have to be careful with your layout. It is a good practice not to define font-size explicitly except root element while using `em` in your project.

`em` works great with layout like sidebar menu where you want submenu items to have smaller font-size gradually. Here is [an example](https://codepen.io/dixita0607/embed/LQNoOL) for that.

You may want use em with media queries as well. Here is a [great article](https://zellwk.com/blog/media-query-units/?source=post_page-----79f7e592bb97--------------------------------) which I found very helpful.

## rem

`rem` values are relative to the root html element, not to the parent element. That is, If font-size of the root element is 16px then 1 rem = 16px for all elements. If font-size is not explicitly defined in root element then 1rem will be equal to the default font-size provided by the browser (usually 16px).

When it comes to spacing and font-sizing, I prefer to use `rem`. Since `rem` uses root element’s font-size instead of its parent’s font-size.

Let’s assume, `font-size: 10px` is set for the root element which makes 1rem = 10px everywhere in our webpage. Since 1px = 0.1rem, calculations are easy. But setting root font-size in pixels will have same problem as I mentioned in the px section.

A solution for this problem is percentage. Usually default font-size of the browser is 16px. Setting `font-size: 100%` will make 1rem = 16px. But it will make calculations a little difficult. A better way is to set `font-size: 62.5%`. Because 62.5% of 16px is 10px. Which makes 1rem = 10px.

Here is [an example](https://codepen.io/dixita0607/embed/OQpWJj?) code in SCSS.

You can see the results by changing font-size of the browser and also try zooming in or out

## article-wrap

**em**s and **rem**s solved problems which I faced using pixels. I use `rem` in spacing (margin, padding, etc.) and font sizing. And I use `em` for layouts like menu. If you know other use cases of ems and rems, let me know via email.
