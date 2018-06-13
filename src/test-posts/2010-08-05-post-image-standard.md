---
title: "Post: Image (Standard)"
image:
  path: ../assets/images/null.png
categories:
  - Post Formats
tags:
  - image
  - Post Formats
---

The preferred way of using images is placing them in the `../assets/images/` directory and referencing them with a relative path.

Standard image with no width modifier classes applied.

**HTML:**

```html
<img src="../assets/images/filename.jpg" alt="">
```

**or Markdown:**

```markdown
![alt](../assets/images/filename.jpg)
```

![Unsplash image 9](../assets/images/unsplash-image-9.jpg)

![Unsplash image 10](../assets/images/unsplash-image-10.jpg)

## Figure Element

You can also add images with HTML and the gatsby-remark-images plugin will do its thing.

```html
<figure>
  <img src="../assets/images/unsplash-image-9.jpg" alt="Unsplash image 9">
  <img src="../assets/images/unsplash-image-10.jpg" alt="Unsplash image 10">
  <figcaption>Two images in a figure element.</figcaption>
</figure>
```

<figure>
  <img src="../assets/images/unsplash-image-5.jpg" alt="Unsplash image 5">
  <img src="../assets/images/unsplash-image-6.jpg" alt="Unsplash image 6">
  <figcaption>Two images in a figure element.</figcaption>
</figure>
