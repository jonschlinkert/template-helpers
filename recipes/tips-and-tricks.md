# Tips and tricks

> Some things you might not know you can do with helpers ;)

Some of these only work with one template engine, others can be used anywhere. Please make sure to read any notes and pay special attention to the **Engines** section of each tip.


## Define a variable

Add a variable to the context, but only for a single template.

**Lo-Dash Example**

```js
// define the variable 
<% foo = "bar" %>

// use it
<%= foo %>
//=> "bar"
```

Works with non-string variables too, of course.

**Engines**

Should work with:

- [Lo-dash]


## Vanilla node.js libs as helpers

Here is a trick for using any plain old node.js library as a helper on-the-fly. To do so, we'll create a special helper that isn't in the library:

**The `require` helper**

```js
var helpers = {
  require: function() {
    // take whatever args are passed
    return require.apply(require, arguments);
  };
};
```

**Lo-Dash Example**

Now you can use the `require` helper in your templates, allowing you to use any other node.js library without registering it as a helper first.

```js
// globbing is already included in this lib, but this is a good example
_.template('<%= require("glob").sync("*.js") %>', {imports: helpers});
```

**Engines**

Should work with:

- [Lo-Dash]



## Chain helpers

Each helper should only have a single responsibility. Chaining allows us to stick to that rule and keep things simple.

**Lo-Dash Example**

1. Read a file from the file system (that happens to be markdown)
2. Convert it to HTML

```js
<%= markdown(read("README.md")) %>
```

**Engines**

Should work with:

- Any


***

# Contributing

If you contribute to this page, please follow the conventions. Thanks!
