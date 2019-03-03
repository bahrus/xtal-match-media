[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/xtal-match-media)

<a href="https://nodei.co/npm/xtal-decorator/"><img src="https://nodei.co/npm/xtal-match-media.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/xtal-match-media">

# \<xtal-match-media\>

Web component that watches for media matches and fires events when they happen.

This is similar to Polymer's [iron-media-query](https://www.webcomponents.org/element/@polymer/iron-media-query), but with no legacy dependencies.  xtal-match-media can partake in Polymer's powerful binding.

Other alternatives are also available (the more the merrier):  

> lit-media-query (https://www.webcomponents.org/element/lit-media-query)

<!--
```
<custom-element-demo>
  <template>
    <div>
      <xtal-match-media media-query-string="(max-width: 800px)"></xtal-match-media>
      <!-- pass down (p-d) to div's textContent value of xtal-match-media above as it changes -->
      <p-d on="matches-media-query-changed" prop="textContent"></p-d>
      <div></div>
      <script type="module" src="https://unpkg.com/p-d.p-u@0.0.105/p-d.js?module"></script>
        <script type="module" src="../xtal-match-media.js"></script>
    </div>
  </template>
</custom-element-demo>
```
-->

Syntax:

```html
    <div class="vertical-section-container centered">
        <script src="../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
        <script src="https://unpkg.com/p-d.p-u@0.0.37/p-d.p-d-x.p-u.js"></script>
        <script type="module" src="../xtal-match-media.js"></script>
      <h3>Basic xtal-match-media demo</h3>
      <xtal-match-media media-query-string="(max-width: 800px)"></xtal-match-media>
      <p-d on="matches-media-query-changed" to="{innerText}"></p-d>
      <div></div>
    </div>
```

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

