# CSS

## [Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)

### From highest to lowest

| Selector type                                         | Example                          |
| ----------------------------------------------------- | -------------------------------- |
| Inline style                                          | style='font-weight:bold'         |
| Type selectors and pseudo-elements                    | h1 and ::before                  |
| Class selectors, attributes selectors, pseudo-classes | .example, [type='radio'], :hover |
| ID selectors                                          | #example                         |

[Example](https://codepen.io/cshold/pen/rjyOXL)

```css
div:first-child { background: black; }
div > div { background: blue; }
div div {background: green; }
div { background: pink; }
div > * { background: red; }
```

#### If two rules have same specificity, the latter rule wins

#### *, +, >, ~ (Universal selector and combinators) and :not() won't affect specificity

```CSS
#test { background: pink; }
div { background: black; }
```

#### Style for directly targeted element will always take precedence over inherited styles
```CSS
#test { background: pink; }
div { background: black; font-size: 5em;}
```

## [Box Model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model)

![Box Model](./asset/box-model-standard-small.png)

[Example](https://codepen.io/guyroutledge/pen/hgpez)

#### Border

default width is 0, `background-colo`  /  `background-image` extend to the edge of border(can be changed using `background-clip`)

```CSS
border-top: 1px solid black;
border-width: 2px;
border-bottom-color: red;
```

#### Margin

##### [margin: auto](http://learnlayout.com/margin-auto.html)

Advanced: [Margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)

#### Padding and border stretches out the element beyond the specified width

##### The total width of a box is sum of width, padding, and boarder

[Example](http://learnlayout.com/box-model.html)

[Example2](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model#Active_learning_playing_with_boxes)

```css
#wrapper * {
    width: 100px;
}
#wrapper main {
    padding: 50px;
}
```

```CSS
#wrapper main {
  background-color: yellow;
  padding: 50px;
  margin: 50px
}
```

```css
#wrapper main {
  background-color: yellow;
  margin-top: -50px
}
```
#### [box-sizing: border-box](http://learnlayout.com/box-sizing.html)

#### If the content is larger than the whole box...

[Example](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model#Advanced_box_manipulation)

##### Box height always adopts the height of the box content, unless a absolute height is set

##### Box height and border width ignores percentage setting

## Three basic type of CSS boxes: `block`, `inline`, `inline-block`

[Example](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model#Types_of_CSS_boxes)

| Type         | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| block        | Appear on a separate line, can have `width` and `height`set. |
| inline       | Appear on the same line as text or other `inline` element, `width` and `height` have no effect. <br />`Padding`, `Margin`, and `border` will not affect surrounding `block`. |
| inline-block | Appear on the same line as text or other `inline` element, can be sized using `width` and `height`, won't be broken across two lines |

