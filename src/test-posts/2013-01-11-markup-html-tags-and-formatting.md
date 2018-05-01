---
title: "Markup: HTML Tags and Formatting"
image:
  path: ../assets/images/null.png
header:
  teaser: "assets/images/markup-syntax-highlighting-teaser.jpg"
categories:
  - Markup
tags:
  - content
  - css
  - formatting
  - html
  - markup
toc: true
---

A variety of common markup showing how the theme styles them.

## Header two

### Header three

#### Header four

##### Header five

###### Header six

## Blockquotes

Single line blockquote:

> Stay hungry. Stay foolish.

Multi line blockquote with a cite reference:

> People think focus means saying yes to the thing you've got to focus on. But that's not what it means at all. It means saying no to the hundred other good ideas that there are. You have to pick carefully. I'm actually as proud of the things we haven't done as the things I have done. Innovation is saying no to 1,000 things.
>
> <cite>Steve Jobs --- Apple Worldwide Developers' Conference, 1997</cite>

## Footnotes

I first encountered footnotes at Daring Fireball[^daring-fireball] and have since seen them on [Shawn Blanc's site](http://shawnblanc.net/), and a few others. At first it was a novelty I would never need. Then I started really writing.

[^daring-fireball]:

  Here is John Gruber's post [About the Footnotes](http://daringfireball.net/2005/07/footnotes). Besides, what would a post about creating footnotes in HTML be without actually having at least one footnote to demonstrate?

Footnotes are also not a core feature of markdown, but they're a common extension feature. The footnote syntax looks like this:

```markdown
This line has a footnote [^footnote-1]. Scroll down or click the link to see it.
```

That renders like this:

This line has a footnote [^footnote-1]. Scroll down or click the link to see it.

## Tables

| Employee         | Salary |                                                              |
| ---------------- | ------ | ------------------------------------------------------------ |
| [John Doe](#)    | $1     | Because that's all Steve Jobs needed for a salary.           |
| [Jane Doe](#)    | $100K  | For all the blogging she does.                               |
| [Fred Bloggs](#) | $100M  | Pictures are worth a thousand words, right? So Jane × 1,000. |
| [Jane Bloggs](#) | $100B  | With hair like that?! Enough said.                           |

## Unordered Lists (Nested)

* List item one
  * List item one
    * List item one
    * List item two
    * List item three
    * List item four
  * List item two
  * List item three
  * List item four
* List item two
* List item three
* List item four

## Ordered List (Nested)

1.  List item one
    1.  List item one
        1.  List item one
        2.  List item two
        3.  List item three
        4.  List item four
    2.  List item two
    3.  List item three
    4.  List item four
2.  List item two
3.  List item three
4.  List item four

## Forms

<form>
  <fieldset>
    <legend>Personalia:</legend>
    Name: <input type="text" size="30"><br>
    Email: <input type="text" size="30"><br>
    Date of birth: <input type="text" size="10">
  </fieldset>
</form>

## HTML Tags

### Address Tag

<address>
  1 Infinite Loop<br /> Cupertino, CA 95014<br /> United States
</address>

### Anchor Tag (aka. Link)

This is an example of a [link](http://apple.com "Apple").

### Abbreviation Tag

The abbreviation CSS stands for "Cascading Style Sheets".

*[CSS]: Cascading Style Sheets

### Cite Tag

"Code is poetry." ---<cite>Automattic</cite>

### Code Tag

You will learn later on in these tests that `word-wrap: break-word;` will be your best friend.

### Strike Tag

This tag will let you <strike>strikeout text</strike>.

### Emphasize Tag

The emphasize tag should _italicize_ text.

### Insert Tag

This tag should denote <ins>inserted</ins> text.

### Keyboard Tag

This scarcely known tag emulates <kbd>keyboard text</kbd>, which is usually styled like the `<code>` tag.

### Preformatted Tag

This tag styles large blocks of code.

<pre>
.post-title {
	margin: 0 0 5px;
	font-weight: bold;
	font-size: 38px;
	line-height: 1.2;
	and here's a line of some really, really, really, really long text, just to see how the PRE tag handles it and to find out how it overflows;
}
</pre>

### Quote Tag

<q>Developers, developers, developers&#8230;</q> &#8211;Steve Ballmer

### Strong Tag

This tag shows **bold text**.

### Subscript Tag

Getting our science styling on with H<sub>2</sub>O, which should push the "2" down.

### Superscript Tag

Still sticking with science and Isaac Newton's E = MC<sup>2</sup>, which should lift the 2 up.

### Variable Tag

This allows you to denote <var>variables</var>.
