# \<xtal-match-media\>

Vanilla-ish custom Element that watches for media matches

This is similar to Polymer's iron-media-query, but with no legacy dependencies.  It can partake in Polymer binding.

Total file size is ~1kb minified and gzipped.  Not including a common file used by xtal-* components, file size is 660 B minified and gzipped.



<!--
```
<custom-element-demo>
  <template>
    <div>
        <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.0.2/webcomponents-loader.js"></script>
        <script src="https://unpkg.com/p-d.p-u@0.0.37/p-d.p-d-x.p-u.js"></script>
        <script type="module" src="https://unpkg.com/xtal-match-media@0.0.1/xtal-match-media.js?module"></script>
      <h3>Basic xtal-match-media demo</h3>
      <xtal-match-media media-query-string="(max-width: 800px)"></xtal-match-media>
      <p-d on="matches-media-query-changed" to="{innerText}"></p-d>
      <div></div>
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

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
